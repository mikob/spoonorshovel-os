<template>
  <div>
    <div class="flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div
            class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    v-for="(column, idx) of shownColumns"
                    :class="{
                      hidden:
                        breakpoints.type.value <=
                          SWITCH_TO_CARD_VIEW_BREAKPOINT && idx > 0,
                      'first-column-width': idx === 0,
                    }"
                    :key="column"
                  >
                    <span class="flex justify-between">
                      <span>
                        <a
                          href="#"
                          class="group inline-flex"
                          @click.prevent="toggleSort(column)"
                        >
                          {{
                            breakpoints.type.value >
                            SWITCH_TO_CARD_VIEW_BREAKPOINT
                              ? filterCategories.find((x) => x.id === column)!
                                  .name
                              : "Resource"
                          }}
                          <span
                            class="ml-2 flex-none rounded"
                            :class="{
                              'text-gray-900 group-hover:bg-gray-300 bg-gray-200':
                                sortColumn[0] === column,
                              'invisible group-hover:visible group-focus:visible text-gray-400':
                                sortColumn[0] !== column,
                            }"
                          >
                            <ChevronDownIcon
                              v-if="sortColumn[1]"
                              class="h-5 w-5"
                              aria-hidden="true"
                            />
                            <ChevronUpIcon
                              v-else
                              class="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        </a>
                      </span>
                      <span v-if="idx === 0" class="font-light text-gray-600">{{
                        `(${sortedResources.length})`
                      }}</span>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  v-for="resource in sortedResources"
                  :key="resource[NonFilterColumnType.Name]"
                >
                  <ResourceRow
                    :resource="resource"
                    :shown-columns="shownColumns"
                  />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.first-column-width {
  width: 700px;
}
</style>

<script lang="ts" setup>
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/20/solid";
import { computed, ref } from "vue";
import ResourceRow from "./ResourceRow.vue";
import {
  filterCategories,
  NonFilterColumnType,
  SWITCH_TO_CARD_VIEW_BREAKPOINT,
  type ColumnType,
} from "@/constants";
import { useResourcesStore } from "@/stores/ResourceStore";
import { useBreakpoints } from "@/breakpoints";

const store = useResourcesStore();
const breakpoints = useBreakpoints();

const sortColumn = ref<[column: ColumnType, desc: boolean]>([
  NonFilterColumnType.Name,
  true,
]);

function toggleSort(column: ColumnType) {
  if (sortColumn.value[0] === column) {
    sortColumn.value[1] = !sortColumn.value[1];
  } else {
    sortColumn.value = [column, true];
  }
}

const sortedResources = computed(() => {
  const _sortColumn = sortColumn.value[0];
  const _desc = sortColumn.value[1];
  // slice to create a copy and not mutate the orig
  return store.filteredResources.slice().sort((a, b) => {
    // sort the options internally
    const x = _desc ? a[_sortColumn] : b[_sortColumn];
    const y = _desc ? b[_sortColumn] : a[_sortColumn];
    if (_sortColumn === NonFilterColumnType.Name) {
      return x.localeCompare(y);
    } else {
      return x.slice().sort()[0] - y.slice().sort()[0];
    }
  });
});

const shownColumns = ref<ColumnType[]>([
  NonFilterColumnType.Name,
  ...filterCategories
    .map((x) => x.id)
    .filter((x) => x !== NonFilterColumnType.Name),
]);
</script>
