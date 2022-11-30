<template>
  <Disclosure
    as="div"
    class="border-t border-gray-200 pt-4 pb-4"
    v-slot="{ open }"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <fieldset v-if="!props.inSideBar">
      <legend class="block text-sm font-medium text-gray-900 w-full">
        <div class="flex justify-between">
          <div>
            {{ category.name }}
          </div>
          <div>
            <a
              href="#"
              class="mr-6 text-primary-600 hover:text-primary-900 transition-opacity"
              @click.prevent.stop="toggleSelectAllNone"
              :class="{ 'opacity-0': !hover }"
              >select {{ selectAllMode ? "all" : "none" }}</a
            >
          </div>
        </div>
      </legend>
      <div class="space-y-3 pt-6">
        <div
          v-for="option in props.category.options"
          :key="option"
          class="flex items-center"
        >
          <FilterSelectWithCount
            :selected="store.selectedFilters[category.id]?.includes(option.id)"
            :category="category"
            :option="option"
          />
        </div>
      </div>
    </fieldset>
    <fieldset v-else>
      <legend class="w-full px-2">
        <DisclosureButton
          class="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500"
        >
          <span class="text-sm font-medium text-gray-900">{{
            category.name
          }}</span>
          <span class="ml-6 flex h-7 items-center">
            <ChevronDownIcon
              :class="[open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform']"
              aria-hidden="true"
            />
          </span>
        </DisclosureButton>
      </legend>
      <DisclosurePanel class="px-4 pt-4 pb-2">
        <div class="space-y-6">
          <div
            class="flex items-center"
            v-for="option in props.category.options"
            :key="option.id"
          >
            <FilterSelectWithCount
              :selected="store.selectedFilters[category.id].includes(option.id)"
              :category="category"
              :option="option"
              :mobile="true"
            />
          </div>
        </div>
      </DisclosurePanel>
    </fieldset>
  </Disclosure>
</template>

<script setup lang="ts">
import { computed, ref, type PropType } from "vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import type { FilterCategoryObject } from "@/@types";
import FilterSelectWithCount from "./FilterSelectWithCount.vue";
import { useResourcesStore } from "@/stores/ResourceStore";
import { filterCategories } from "@/constants";
import { hasMouse } from "@/utils";

const hover = ref(hasMouse ? false : true);

const props = defineProps({
  category: {
    type: Object as PropType<FilterCategoryObject>,
    required: true,
  },
  inSideBar: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const store = useResourcesStore();
const totalFilterOptions =
  filterCategories.find((category) => category.id === props.category.id)
    ?.options?.length || 0;

const selectAllMode = computed(() => {
  return store.selectedFilters[props.category.id]?.length < totalFilterOptions;
});

function toggleSelectAllNone() {
  if (selectAllMode.value) {
    store.addFilters(props.category.id);
  } else {
    store.removeFilters(props.category.id);
  }
}
</script>
