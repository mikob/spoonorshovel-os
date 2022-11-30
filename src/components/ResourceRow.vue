<template>
  <template v-if="breakpoints.type.value > SWITCH_TO_CARD_VIEW_BREAKPOINT">
    <ResourceCell
      v-for="(column, idx) in props.shownColumns"
      :key="column"
      :idx="idx"
      :columnType="column"
      :columnData="getColumnData(column)"
    />
  </template>
  <ResourceCard
    v-else
    :resource="resource"
    :shown-columns="props.shownColumns"
  />
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import ResourceCell from "./ResourceCell.vue";
import ResourceCard from "./ResourceCard.vue";
import {
  NonFilterColumnType,
  SWITCH_TO_CARD_VIEW_BREAKPOINT,
} from "@/constants";
import type { Resource } from "@/@types";
import { useBreakpoints } from "@/breakpoints";
import { pick } from "@/utils";
import type { FilterCategory } from "@/generated/resources-enums";

const breakpoints = useBreakpoints();

const condensedColumnData = {
  [NonFilterColumnType.Name]: (resource: Resource) =>
    pick(resource, NonFilterColumnType.Name, "link", "description", "preview"),
};

const props = defineProps({
  resource: {
    type: Object as PropType<Resource>,
    required: true,
  },
  shownColumns: {
    type: Array as PropType<FilterCategory[]>,
    required: true,
  },
});

function getColumnData(column: FilterCategory) {
  if (column in condensedColumnData) {
    return condensedColumnData[column](props.resource);
  }
  return props.resource[column];
}
</script>
