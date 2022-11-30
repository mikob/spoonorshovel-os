<template>
  <TransitionRoot as="template" :show="props.modelValue">
    <Dialog
      as="div"
      class="relative z-10"
      @close="emit('update:modelValue', false)"
    >
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div class="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                <button
                  type="button"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  @click="emit('update:modelValue', false)"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    class="text-lg leading-6 text-gray-900 pb-2 font-bold"
                    >🔔 Get Updates</DialogTitle
                  >
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Want to know when we make major changes? We're adding new
                      resources and improving our recommendations all the time.
                    </p>
                    <p class="text-sm text-gray-500">
                      No spam or annoying emails, we promise.
                    </p>
                    <form
                      class="space-y-8 divide-y divide-white mt-8"
                      @submit.prevent="subscribe"
                    >
                      <div class="sm:col-span-4">
                        <label
                          for="email"
                          class="block text-sm font-medium text-gray-700"
                          >Email address</label
                        >
                        <div class="mt-1">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autocomplete="email"
                            v-model="email"
                            required
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <fieldset>
                        <div class="mt-4 space-y-4">
                          <div class="relative flex items-start">
                            <div class="flex h-5 items-center">
                              <input
                                id="comments"
                                name="comments"
                                v-model="checkedInterestedRoadmap"
                                type="checkbox"
                                class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                              />
                            </div>
                            <div class="ml-3 text-sm">
                              <label
                                for="comments"
                                class="font-medium text-gray-700"
                                >Send me a roadmap</label
                              >
                              <p class="text-gray-500">
                                Get a personalized Spanish-learning roadmap when
                                it's ready.
                              </p>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <Button
                          :disabled="loading"
                          label="Subscribe"
                          type="submit"
                        />
                        <Button
                          @click="emit('update:modelValue', false)"
                          :hollow="true"
                          label="Cancel"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "@/components/Button.vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { API_URL } from "@/constants";
import { notify } from "@/notifier";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
const loading = ref(false);
const email = ref("");
const checkedInterestedRoadmap = ref(false);

async function subscribe() {
  loading.value = true;
  try {
    await fetch(`${API_URL}newsletter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        interested_roadmap: checkedInterestedRoadmap.value,
      }),
    });
    emit("update:modelValue", false);
    notify("Success", "You have been subscribed to updates!");
  } catch (e) {
    console.error(e);
    notify("Error", "Please check your email or try again later.", false);
  } finally {
    loading.value = false;
  }
}
</script>
