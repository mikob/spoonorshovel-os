/**
 * we have enums for the category options so that the backend
 * can efficiently use numeric ids to refer to them instead of strings
 */

import type { FilterCategoryObject } from "./@types";
import {
  Level,
  PracticeType,
  Format,
  Pricing,
  ResourceType,
  Tags,
  Topics,
  FilterCategory,
  niceLabels,
} from "@/generated/resources-enums";

export const SWITCH_TO_CARD_VIEW_BREAKPOINT = 3;
//export const API_URL = "https://www.spoonorshovel.com/api/";
export const API_URL = "/api/";
export enum NonFilterColumnType {
  Name = 0,
}

export type ColumnType = FilterCategory | NonFilterColumnType;

const filterCategoriesExtension: FilterCategoryObject[] = [
  {
    id: FilterCategory.Level,
    name: "Level",
    options: [
      {
        id: Level.absoluteBeginner,
        color: "#A1CEA6",
      },
      {
        id: Level.beginner,
        color: "#F5DF9E",
      },
      {
        id: Level.intermediate,
        color: "#F9C888",
      },
      {
        id: Level.advanced,
        color: "#F99696",
      },
    ],
  },
  {
    id: FilterCategory.PracticeType,
    name: "Practice Type",
    options: [
      {
        id: PracticeType.reading,
        emoji: "📚",
      },
      {
        id: PracticeType.writing,
        emoji: "📝️",
      },
      {
        id: PracticeType.listening,
        emoji: "👂",
      },
      {
        id: PracticeType.speaking,
        emoji: "💬",
      },
      {
        id: PracticeType.pronunciation,
        emoji: "🗣",
      },
    ],
  },
  {
    id: FilterCategory.Tags,
    name: "Tags",
    options: [
      {
        id: Tags.mexicanSpanish,
        emoji: "🇲🇽",
      },
      {
        id: Tags.colombianSpanish,
        emoji: "🇨🇴",
      },
      {
        id: Tags.argentineSpanish,
        emoji: "🇦🇷",
      },
      {
        id: Tags.latinAmericanSpanish,
        emoji: "🌎",
      },
      {
        id: Tags.castillianSpanish,
        emoji: "🇪🇸",
      },
      {
        id: Tags.spanishEnglishmix,
        emoji: "🇬🇧",
      },
      {
        id: Tags._18,
        emoji: "🔞",
      },
      {
        id: Tags.game,
        emoji: "🎮",
      },
      {
        id: Tags.realWorld,
        emoji: "🏙",
      },
      {
        id: Tags.defunct,
        emoji: "☠️",
      },
      {
        id: Tags.conversation,
        emoji: "👥",
      },
      {
        id: Tags.fun,
        emoji: "🎉",
      },
      {
        id: Tags.slang,
        emoji: "🤙",
      },
      {
        id: Tags.popular,
        emoji: "🔥",
      },
      {
        id: Tags.business,
        emoji: "💼",
      },
      {
        id: Tags.goodforChildren,
        emoji: "👶",
      },
    ],
  },
  {
    id: FilterCategory.ResourceType,
    name: "Resource Type",
    options: [
      {
        id: ResourceType.tool,
        emoji: "🛠",
      },
      {
        id: ResourceType.course,
        emoji: "🎓",
      },
      {
        id: ResourceType.freeformTeaching,
        emoji: "🕊️",
      },
      {
        id: ResourceType.contentforNatives,
        emoji: "🧙‍♂️",
      },
    ],
  },
  {
    id: FilterCategory.Format,
    name: "Format",
    options: [
      {
        id: Format.webapp,
        emoji: "🌐",
      },
      {
        id: Format.mobileApp,
        emoji: "📱",
      },
      {
        id: Format.desktopApp,
        emoji: "🖥️",
      },
      {
        id: Format.browserExtension,
      },
      {
        id: Format.podcast,
        emoji: "🎧",
      },
      {
        id: Format.book,
        emoji: "📕",
      },
      {
        id: Format.audiobook,
      },
      {
        id: Format.textbook,
      },
      {
        id: Format.youTubeChannel,
        emoji: "🎬",
      },
      {
        id: Format.videoChat,

        // emoji: "📞",
        emoji: "📹",
      },
      {
        id: Format.chatroom,
        emoji: "💬",
      },
    ],
  },
  {
    id: FilterCategory.Pricing,
    name: "Pricing",
    options: [
      {
        id: Pricing.freeads,
        emoji: "📢",
      },
      {
        id: Pricing.freenoads,
        emoji: "🍀",
      },
      {
        id: Pricing.freemium,
        emoji: "🎁",
      },
      {
        id: Pricing.paidFreeTrial,
        emoji: "⌛",
      },
      {
        id: Pricing.paidOneTimeFee,
        emoji: "💲",
      },
      {
        id: Pricing.paidSubscription,
        emoji: "📅",
      },
    ],
  },
  {
    id: FilterCategory.Topics,
    name: "Topics",
    options: [
      {
        id: Topics.activism,
      },
      {
        id: Topics.art,
        emoji: "🎨",
      },
      {
        id: Topics.history,
        emoji: "📜",
      },
      {
        id: Topics.technology,
        emoji: "🖥️",
      },
      {
        id: Topics.film,
        emoji: "🎬",
      },
      {
        id: Topics.travel,
        emoji: "✈️",
      },
      {
        id: Topics.food,
        emoji: "🍔",
      },
      {
        id: Topics.music,
        emoji: "🎻",
      },
      {
        id: Topics.culture,
        emoji: "🗿",
      },
      {
        id: Topics.comedy,
        emoji: "🤣",
      },
      {
        id: Topics.socializing,
        emoji: "👩🏼‍🤝‍👩🏾",
      },
      {
        id: Topics.literature,
        emoji: "📖",
      },
    ],
  },
  {
    id: NonFilterColumnType.Name,
    name: "Name",
  },
];

export const filterCategories = filterCategoriesExtension.map((category) => {
  const extendedCategory = filterCategoriesExtension.find(
    (_category) => category.id === _category.id
  );
  return {
    ...category,
    ...extendedCategory,
    options: Object.keys(niceLabels[category.id] || {})
      .map((optionId) => {
        const extendedOption = extendedCategory?.options.find(
          (_option) => _option.id == optionId
        );
        return {
          id: +optionId,
          label: niceLabels[category.id][optionId],
          ...extendedOption,
        };
      })
      /*
       * Sort order defined by filterCategoryExtension
       */
      .sort((a, b) => {
        const aIndex = extendedCategory?.options.findIndex(
          (opt) => opt.id == a.id
        );
        const bIndex = extendedCategory?.options.findIndex(
          (opt) => opt.id == b.id
        );
        if (~aIndex && ~bIndex) {
          return aIndex - bIndex;
        } else if (~aIndex) {
          return -1;
        } else if (~bIndex) {
          return 1;
        } else {
          return 0;
        }
      }),
  };
});
