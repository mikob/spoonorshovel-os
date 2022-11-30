import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { Client } from "@notionhq/client";
import * as fs from "node:fs";
import prettier from "prettier";

const NOTION_SECRET_KEY = process.env.NOTION_SECRET_KEY;
const DATABASE_ID = process.env.NOTION_DATABASE_ID!;
const RESOURCES_FILE_NAME = "resources.ts";
const ENUM_FILE_NAME = "resources-enums.ts";
const EXPORT_FILE_DIR = `./src/generated/`;
const BACKUP_DIR = "./backups";

const notion = new Client({ auth: `${NOTION_SECRET_KEY}` });

async function run() {
  makeBackup();
  const [meta, resources] = await Promise.all([getDBMeta(), getResources()]);
  const [multiSelectProps, metaContent] = getMetaData(meta);
  formattedWrite(ENUM_FILE_NAME, metaContent);
  formattedWrite(
    RESOURCES_FILE_NAME,
    makeResourcesContent(multiSelectProps, resources)
  );
  console.log(`Successfully imported ${resources.length} resources`);
}

function makeBackup() {
  const date = new Date();
  const dateString = date.toISOString();
  for (const fileName of [RESOURCES_FILE_NAME, ENUM_FILE_NAME]) {
    const backupFileName = fileName.replace(".ts", `_${dateString}.ts`);

    // make backups dir if it doesn't exist
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR);
    }

    fs.copyFileSync(
      `${EXPORT_FILE_DIR}${fileName}`,
      `${BACKUP_DIR}/${backupFileName}`
    );
    console.log(`Successfully created backup: ${backupFileName}`);
  }
}

async function getDBMeta() {
  const response = await notion.databases.retrieve({
    database_id: DATABASE_ID,
  });
  return response;
}

async function getResources() {
  let response = await notion.databases.query({
    database_id: DATABASE_ID,
  });
  let fullResults = response.results;
  do {
    response = await notion.databases.query({
      database_id: DATABASE_ID,
      start_cursor: response.next_cursor!,
    });
    fullResults = fullResults.concat(response.results);
  } while (response.has_more);
  return fullResults;
}

function formattedWrite(path, contents) {
  fs.writeFileSync(
    `${EXPORT_FILE_DIR}${path}`,
    prettier.format(contents, { parser: "babel-ts" })
  );
}

function codedEnum(text: string) {
  const friendly: string = text.replace(/[\\/-\s\.\+]+/g, "");
  // if it starts with a number, add an underscore
  if (friendly.match(/^[0-9]/)) {
    return `_${friendly}`;
  }
  return friendly[0].toLowerCase() + friendly.slice(1);
}

function getMetaData(
  meta
): [multiSelectProps: Record<string, string>, metaContent: string] {
  const multiSelectProps: Record<string, string> = {};
  const niceLabels: string[] = [];
  const typeDefs = Object.keys(meta.properties).map((prop) => {
    const propType = meta.properties[prop].type;
    if (propType == "multi_select") {
      const enumToNice: Record<string, string> = {};
      const propNice = prop.replace(/\s+/, "");
      const options = meta.properties[prop].multi_select.options.map(
        (option) => {
          const coded = codedEnum(option.name);
          enumToNice[coded] = option.name;
          return coded;
        }
      );
      multiSelectProps[propNice] = prop;
      niceLabels.push(
        `[FilterCategory.${propNice}]: {${Object.keys(enumToNice)
          .map((k) => `[${propNice}.${k}]: "${enumToNice[k]}"`)
          .join(",")}}`
      );
      return `export enum ${propNice} { ${options.join(",")} };`;
    }
  });
  return [
    multiSelectProps,
    [
      ...typeDefs,
      `export enum FilterCategory { ${Object.keys(multiSelectProps).map(
        (k, idx) => `${k} = ${idx + 1}`
      )} }`,
      `export const niceLabels = {${niceLabels.join(",")}}`,
    ].join("\n"),
  ];
}

// prepare the file contents here:
function makeResourcesContent(
  multiSelectProps: Record<string, string>,
  resources
) {
  const beginning = `import type { Resource } from "./@types";
    import { NonFilterColumnType } from "@/constants";
    import {
      FilterCategory,
      ${Object.keys(multiSelectProps).join(",")}
    } from "@/generated/resources-enums";
    
    export const resources: Resource[] = [
      `;

  let middle = "";
  resources.forEach((element) => {
    // use JSON.stringify to escape quotes
    middle += `
      {
      [NonFilterColumnType.Name]: ${JSON.stringify(
        element.properties["Name"].title[0]?.["plain_text"].trim()
      )},
      description: ${JSON.stringify(
        element.properties["Description"].rich_text[0]?.["plain_text"].trim()
      )},
      link: ${JSON.stringify(
        element.properties["Link"].rich_text[0]?.["plain_text"].trim()
      )},
      preview: ${JSON.stringify(
        element.properties["Preview"]?.files[0]?.external.url
      )},
      demerits: [${getDemerits(
        element.properties["Negatives"].rich_text[0]?.["plain_text"]
      )}],
      related: [${getRelated(element.properties["Related"].relation)}],
      ${Object.keys(multiSelectProps).map(
        (prop) =>
          `[FilterCategory.${prop}]: [${element.properties[
            multiSelectProps[prop]
          ].multi_select
            .map((ms) => `${prop}.${codedEnum(ms.name)}`)
            .join(",")}]`
      )}
    },`;
  });

  const end = `
    ];`;

  return beginning + middle + end;
}

function getDemerits(text) {
  const array: string[] = [];
  const temp = text !== undefined ? text.split(/\r\n|\r|\n/) : [];
  temp.forEach((element) => {
    array.push('"' + element.trim() + '"');
  });
  return array;
}

function getRelated(array) {
  const ids: string[] = [];
  if (array.length > 0) {
    array.forEach((element) => {
      ids.push('"' + element.id + '"');
    });
  }
  return ids;
}

(async () => await run())();
