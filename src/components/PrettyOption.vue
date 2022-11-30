<template>
  <span
    v-if="option.color"
    class="rounded-full px-2 py-1 text-xs text-black whitespace-nowrap"
    :style="{ 'background-color': option.color, color: option.textColor }"
    >{{ option.emoji }} {{ option.label }}</span
  >
  <span v-else>{{ option.emoji }} {{ option.label }}</span>
</template>

<script setup lang="ts">
import type { FilterOption } from "@/@types";
import type { PropType } from "vue";

defineProps({
  option: {
    required: true,
    type: Object as PropType<FilterOption>,
  },
});
</script>
