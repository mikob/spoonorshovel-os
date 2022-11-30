<template>
  <iframe
    id="player"
    type="text/html"
    :width="width"
    :height="height"
    :src="modifiedSrc"
    frameborder="0"
  ></iframe>
</template>

<script lang="ts" setup>
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    default: 384,
  },
  height: {
    type: Number,
    default: 240,
  },
});

const origin = window.location.origin;

const url = new URL(
  props.src
    .replace("watch?v=", "embed/")
    .replace("youtu.be/", "www.youtube.com/embed/")
    .replace(/t=(\d+)/, "start=$1")
);
url.searchParams.set("origin", origin);
url.searchParams.set("enablejsapi", "1");
const modifiedSrc = url.href;
</script>
