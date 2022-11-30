import type { FilterCategory, NonFilterColumnType } from "@/constants";

type Format = import("./constants").Format;
type PracticeType = import("./constants").PracticeType;
type Pricing = import("./constants").Pricing;

interface Resource {
  [NonFilterColumnType.Name]: string;
  description: string;
  link: string;
  preview: string;
  [FilterCategory.Level]: number[];
  [FilterCategory.Format]: Format[];
  [FilterCategory.PracticeType]: PracticeType[];
  [FilterCategory.Pricing]: Pricing[];
  tags?: string[];
  demerits?: string[];
  description?: string;
  videoURL?: string;
  related?: string[];
}

interface _FilterOption {
  id: number;
}

type EmojiFilterOption = _FilterOption & { emoji: string };

type IconFilterOption = _FilterOption & { icon: string };

type ColorFilterOption = _FilterOption & { color: string };

type FilterOption =
  | IconFilterOption
  | EmojiFilterOption
  | ColorFilterOption
  | _FilterOption;

interface FilterCategoryObject {
  id: FilterCategory;
  name: string;
  options: FilterOption[];
}
