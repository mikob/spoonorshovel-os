<template>
  <button
    type="button"
    class="inline-flex items-center rounded-md border border-transparent px-3 py-2 m-2 text-sm font-medium leading-4 text-primary-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    :class="{
      'border-primary-300 hover:bg-primary-200': hollow,
      'bg-primary-200 text-primary-900 hover:bg-primary-300':
        !disabled && !hollow,
      'bg-primary-100 text-primary-700': disabled,
    }"
    v-bind="props"
  >
    <!-- <EnvelopeIcon v-if="icon" class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" /> -->
    {{ label }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: Object,
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  hollow: {
    type: Boolean,
    default: false,
  },
});
</script>
