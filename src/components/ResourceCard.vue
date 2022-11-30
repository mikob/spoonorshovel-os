<template>
  <td class="whitespace-nowrap p-4 text-sm text-gray-500 align-top">
    <dl class="font-normal">
      <template
        v-for="(columnType, idx) in props.shownColumns"
        :key="columnType"
      >
        <dt>{{ filterCategories.find((x) => x.id === columnType)!.name }}</dt>
        <dd class="m-2">
          <div v-if="columnType === NonFilterColumnType.Name">
            <YoutubePlayer
              v-if="props.resource.preview"
              :src="props.resource.preview"
            />
            <div class="font-medium text-gray-900">
              <a target="_blank" :href="props.resource.link">
                {{ props.resource[NonFilterColumnType.Name] }}
              </a>
            </div>
            <p class="text-gray-500 whitespace-normal">
              {{ props.resource.description }}
            </p>
          </div>
          <div
            v-else
            class="text-gray-900 my-2"
            v-for="item of optionsForColumnType(columnType)"
            :key="item.id"
          >
            <PrettyOption :option="item" />
          </div>
        </dd>
      </template>
    </dl>
  </td>
</template>

<script setup lang="ts">
import type { Resource } from "@/@types";
import {
  filterCategories,
  NonFilterColumnType,
  type ColumnType,
} from "@/constants";
import type { PropType } from "vue";
import PrettyOption from "./PrettyOption.vue";
import YoutubePlayer from "./YoutubePlayer.vue";

const props = defineProps({
  resource: {
    type: Object as PropType<Resource>,
    required: true,
  },
  shownColumns: {
    type: Array as PropType<ColumnType[]>,
    required: true,
  },
});

function optionsForColumnType(columnType: ColumnType) {
  const possibleOptions = filterCategories.find(
    (x) => x.id === columnType
  )?.options;
  const options = possibleOptions?.filter((x) =>
    props.resource[columnType].includes(x.id)
  );
  return options;
}
</script>
