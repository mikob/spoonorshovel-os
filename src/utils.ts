// so we know if they can hover an element
export const hasMouse = matchMedia("(pointer:fine)").matches;

export function allEnumValues(enumType: any) {
  return Object.keys(enumType)
    .map((key) => enumType[key])
    .filter((value) => typeof value === "number");
}

export function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const ret: any = {};
  keys.forEach((key) => {
    ret[key] = obj[key];
  });
  return ret;
}

export function encodeFilters(filters: Record<number, number[]>) {
  return Object.keys(filters)
    .map((key) => `${key}:${filters[key].join(",")}`)
    .join(";");
}

export function decodeFilters(filters: string) {
  return filters
    .split(";")
    .map((x) => x.split(":"))
    .reduce((acc, [key, value]) => {
      if (value === "") {
        acc[key] = [];
      } else {
        acc[key] = value.split(",").map((x) => parseInt(x));
      }
      return acc;
    }, {} as Record<number, number[]>);
}
