import { computed, onMounted, onUnmounted, ref } from "vue";

export const useBreakpoints = () => {
  let windowWidth = ref(window.innerWidth);

  const onWidthChange = () => (windowWidth.value = window.innerWidth);
  onMounted(() => window.addEventListener("resize", onWidthChange));
  onUnmounted(() => window.removeEventListener("resize", onWidthChange));

  const type = computed(() => {
    if (windowWidth.value < 640) return 0;
    if (windowWidth.value >= 640 && windowWidth.value < 768) return 1;
    if (windowWidth.value >= 768 && windowWidth.value < 1024) return 2;
    if (windowWidth.value >= 1024 && windowWidth.value < 1280) return 3;
    return 4;
  });

  const width = computed(() => windowWidth.value);

  return { width, type };
};
