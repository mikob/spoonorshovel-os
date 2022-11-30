import { filterCategories } from "@/constants";
import { FilterCategory } from "@/generated/resources-enums";
import { resources } from "@/generated/resources";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useResourcesStore = defineStore("resources", () => {
  const selectedFilters = ref({
    [FilterCategory.Level]: [],
    [FilterCategory.Tags]: [],
    [FilterCategory.ResourceType]: [],
    [FilterCategory.PracticeType]: [],
    [FilterCategory.Format]: [],
    [FilterCategory.Pricing]: [],
    [FilterCategory.Topics]: [],
  });

  const filteredResources = computed(() => {
    let prevPassed = resources;
    for (const resource of prevPassed) {
      for (const filterCategory in selectedFilters.value) {
        // if the filter selection is empty, it's like saying "any" so everything
        // passes
        if (selectedFilters.value[filterCategory].length === 0) continue;
        let passedCategory = false;
        for (const option of selectedFilters.value[filterCategory]) {
          if (resource[filterCategory]?.includes(option)) {
            passedCategory = true;
            break;
          }
        }
        if (!passedCategory) {
          prevPassed = prevPassed.filter((r) => r !== resource);
        }
      }
    }
    // console.log("prevPassed", prevPassed);
    // console.log(
    //   "resources that did not pass",
    //   resources.filter((r) => prevPassed.includes(r))
    // );
    return prevPassed;
  });

  function addFilters(categoryId: FilterCategory, ...filterIds: number[]) {
    const _filterIds = filterIds.length
      ? filterIds
      : filterCategories
          .find((c) => c.id == categoryId)!
          .options.map((o) => o.id);
    for (const id of _filterIds) {
      if (!selectedFilters.value[categoryId].includes(id)) {
        selectedFilters.value[categoryId].push(id);
      }
    }
  }

  function removeFilters(categoryId: FilterCategory, ...filterIds: number[]) {
    if (filterIds.length === 0) selectedFilters.value[categoryId] = [];
    selectedFilters.value[categoryId] = selectedFilters.value[
      categoryId
    ]?.filter((id) => !filterIds.includes(id));
  }

  function setFilters(categoryId: FilterCategory, ...filterIds: number[]) {
    selectedFilters.value[categoryId] = filterIds;
  }

  /**
   * For the numbers next to each filter option.
   * After applying filters, how many in this option?
   */
  const getFilterCount = computed(
    () =>
      (categoryId: FilterCategory, filterId: number): number => {
        let prevPassed = resources;
        for (const resource of prevPassed) {
          for (const filterCategory in selectedFilters.value) {
            if (selectedFilters.value[filterCategory].length === 0) continue;
            if (filterCategory == categoryId) {
              continue;
            }
            let passedCategory = false;
            for (const option of selectedFilters.value[filterCategory]) {
              if (resource[filterCategory].includes(option)) {
                passedCategory = true;
                break;
              }
            }
            if (!passedCategory) {
              prevPassed = prevPassed.filter((r) => r !== resource);
            }
          }
        }
        // get the numbers for the filterId that we're checking for
        let passed = 0;
        for (const resource of prevPassed) {
          if (resource[categoryId]?.includes(filterId)) {
            passed++;
          }
        }

        return passed;
      }
  );

  return {
    filteredResources,
    selectedFilters,
    addFilters,
    setFilters,
    removeFilters,
    getFilterCount,
  };
});
