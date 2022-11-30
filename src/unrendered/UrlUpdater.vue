<script setup lang="ts">
import { encodeFilters } from "@/utils";
import { watch } from "vue";
import { useRouter } from "vue-router";
import { useResourcesStore } from "../stores/ResourceStore";

const router = useRouter();
const store = useResourcesStore();

watch(store.selectedFilters, () => {
  router.replace({ query: { filters: encodeFilters(store.selectedFilters) } });
});
</script>
