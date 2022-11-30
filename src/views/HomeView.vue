<template>
  <div class="bg-white">
    <div>
      <SideBar
        v-model:open="mobileFiltersOpen"
        :filterCategories="filterCategories"
        v-model:selectedFilters="selectedFilters"
        :resources="resources"
      />

      <main class="mx-auto pb-16 pt-10 px-4 sm:pb-24 sm:pt-18 sm:px-6 lg:px-8">
        <div class="p-10 rounded-md max-w-7xl mx-auto">
          <h1 class="text-4xl font-bold tracking-tight text-primary-900">
            Not all Spanish learning resources are equal.
          </h1>
          <p class="mt-4 text-xl text-primary-800">
            Overwhelmed by how many Spanish-learning resources there are?
          </p>
          <p class="text-xl text-primary-800">
            We spent <strong>40+ hours</strong>, tested and compared
            <strong>{{ numResources }}+ Spanish learning resources</strong> so
            you don't have to.
          </p>
          <p class="text-sm mt-2 text-primary-700 flex items-center">
            <img src="@/assets/images/no-money.svg" width="25" height="25" />
            <span class="ml-1">No sponsored results or affiliate links.</span>
          </p>
        </div>
        <section
          class="mt-4 text-xl border-primary-200 border text-primary-800 bg-primary-100 rounded-md px-10 py-6 max-w-7xl mx-auto"
        >
          <h2 class="pb-2 text-2xl font-medium">Which best describes you?</h2>
          <div class="pt-4">
            <Button
              label="💻 Expat/Digital Nomad"
              @click="router.push({ name: 'quiz', query: { id: 'q20' } })"
            />
            <Button
              label="👩‍🏫 Teacher"
              @click="router.push({ name: 'quiz', query: { id: 'q1' } })"
            />
            <Button
              label="🎒 HS/College Student"
              @click="router.push({ name: 'quiz', query: { id: 'q30' } })"
            />
            <Button
              label="🧠 Hobbyist (learning for funzies)"
              @click="router.push({ name: 'quiz', query: { id: 'q30' } })"
            />
            <Button
              label="💼 Work with Spanish-speakers"
              @click="router.push({ name: 'quiz', query: { id: 'q30' } })"
            />
            <Button
              label="❄️ Other"
              @click="router.push({ name: 'quiz', query: { id: 'q10' } })"
            />
          </div>
        </section>

        <div class="pt-12 flex max-lg:flex-col">
          <aside class="min-w-max">
            <h2 class="sr-only">Filters</h2>

            <button
              type="button"
              class="inline-flex items-center lg:hidden mb-4"
              @click="mobileFiltersOpen = true"
            >
              <span class="text-sm font-medium text-gray-700">Filters</span>
              <PlusIcon
                class="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
            </button>

            <div class="hidden lg:block">
              <form class="space-y-10 divide-y divide-gray-200">
                <CategoryFilterSelectors
                  v-for="(filterCategory, idx) in filterCategories"
                  :key="filterCategory.name"
                  :class="idx === 0 ? null : 'pt-10'"
                  :category="filterCategory"
                />
              </form>
            </div>
          </aside>

          <div>
            <ResourceTable />
          </div>
        </div>
      </main>
    </div>
  </div>
  <UrlUpdater />
</template>

<script setup lang="ts">
import ResourceTable from "../components/ResourceTable.vue";
import SideBar from "../components/SideBar.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { PlusIcon } from "@heroicons/vue/20/solid";
import { filterCategories } from "../constants";
import { resources } from "@/generated/resources";
import CategoryFilterSelectors from "../components/CategoryFilterSelectors.vue";
import Button from "../components/Button.vue";
import { useResourcesStore } from "@/stores/ResourceStore";
import UrlUpdater from "../unrendered/UrlUpdater.vue";
import { decodeFilters } from "@/utils";

const mobileFiltersOpen = ref(false);
const router = useRouter();
const numResources = resources.length;
const route = useRoute();
const store = useResourcesStore();

onMounted(() => {
  if (route.query.filters) {
    const decodedFilters = decodeFilters(route.query.filters as string);
    for (const c in decodedFilters) {
      store.setFilters(+c, ...decodedFilters[c]);
    }
    // store.setFilters()
  }
});
</script>
