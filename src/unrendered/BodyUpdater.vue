<template></template>
<script setup lang="ts">
/**
 * Fixes issue with body scrolling in the background on narrow screens when
 * the hamburger menu is open.
 */
import { watchEffect } from "vue";

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});

watchEffect(() => {
  if (props.open) {
    return document.querySelector("body").classList.add("overflow-hidden");
  }

  document.querySelector("body").classList.remove("overflow-hidden");
});
</script>
