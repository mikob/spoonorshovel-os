<template>
  <div @mouseover="hover = true" @mouseleave="hover = false">
    <input
      :id="`${category.name}-${option.id}${props.mobile ? '-mobile' : ''}`"
      :name="`${category.name}[]`"
      :checked="store.selectedFilters[category.id]?.includes(option.id)"
      @change="toggleFilter"
      type="checkbox"
      class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
    />
    <label
      :for="`${category.name}-${option.id}${props.mobile ? '-mobile' : ''}`"
      class="ml-3 text-sm text-gray-500"
    >
      <PrettyOption :option="option" /> ({{ count }})
    </label>
    <a
      href="#"
      @click.prevent="selectOnly"
      class="ml-auto text-sm text-primary-600 transition-opacity hover:text-primary-900"
      :class="{ 'opacity-0': !hover }"
      >select only</a
    >
  </div>
</template>

<script setup lang="ts">
import type { FilterCategoryObject, FilterOption } from "@/@types";
import { useResourcesStore } from "@/stores/ResourceStore";
import { computed, ref, type PropType } from "vue";
import PrettyOption from "./PrettyOption.vue";
import { hasMouse } from "@/utils";

const store = useResourcesStore();

const props = defineProps({
  option: {
    type: Object as PropType<FilterOption>,
    required: true,
  },
  category: {
    type: Object as PropType<FilterCategoryObject>,
    required: true,
  },
  selected: {
    type: Boolean,
    required: true,
  },
  mobile: {
    type: Boolean,
    default: false,
  },
});

const hover = ref(hasMouse ? false : true);

const count = computed(() =>
  store.getFilterCount(props.category.id, props.option.id)
);

function toggleFilter(e) {
  if (e.target.checked) {
    store.addFilters(props.category.id, props.option.id);
  } else {
    store.removeFilters(props.category.id, props.option.id);
  }
}

function selectOnly() {
  store.setFilters(props.category.id, props.option.id);
}
</script>
