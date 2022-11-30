<template>
  <td
    class="py-4 text-sm text-gray-500 align-top"
    :class="{
      'pl-4 sm:pl-6 pr-3': props.idx === 0,
      'px-3': props.idx > 0,
    }"
  >
    <div v-if="columnType === NonFilterColumnType.Name" class="flex">
      <YoutubePlayer
        v-if="props.columnData.preview"
        class="mr-6"
        :src="props.columnData.preview"
      />
      <div>
        <div class="font-medium text-gray-900">
          <a target="_blank" :href="props.columnData.link">{{
            props.columnData[NonFilterColumnType.Name]
          }}</a>
        </div>
        <p class="text-gray-500 whitespace-normal">
          {{ props.columnData.description }}
        </p>
      </div>
    </div>
    <div
      v-else
      class="text-gray-900 m-2"
      v-for="item of itemOptions"
      :key="item.id"
    >
      <PrettyOption :option="item" />
    </div>
  </td>
</template>

<script setup lang="ts">
import {
  filterCategories,
  NonFilterColumnType,
  type ColumnType,
} from "@/constants";
import type { PropType } from "vue";
import PrettyOption from "./PrettyOption.vue";
import YoutubePlayer from "./YoutubePlayer.vue";

const props = defineProps({
  columnType: {
    type: Number as PropType<ColumnType>,
    required: true,
  },
  columnData: {
    type: Object,
    required: true,
  },
  idx: {
    type: Number,
    required: true,
  },
});

const possibleOptions = filterCategories.find(
  (x) => x.id === props.columnType
)?.options;
const itemOptions = possibleOptions?.filter((x) =>
  props.columnData.includes(x.id)
);
</script>
