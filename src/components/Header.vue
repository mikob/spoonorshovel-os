<template>
  <Popover as="template" v-slot="{ open }">
    <header
      :class="[
        open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
        'bg-white shadow-sm lg:static lg:overflow-y-visible',
      ]"
    >
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="relative flex justify-between"
        >
          <div class="flex m-2 ">
            <div class="flex flex-shrink-0  place-items-center">
              <RouterLink :to="{ name: 'home' }">
                <img
                  class="block h-14 w-auto  bg-white p-2 rounded-lg"
                 :src="logo"
                  alt="Spoon or Shovel"
                />
                
              </RouterLink>
              <RouterLink :to="{ name: 'home' }"><h1 class="italic  bg-purple-200 hover:bg-purple-300 p-2 text-md font-bold rounded-md ">Spoon or Shovel</h1></RouterLink>
              <RouterLink :to="{name: 'quiz'}" class="ml-4 invisible md:visible text-sm font-medium hover:bg-gray-100 hover:rounded-lg px-3 py-2">Quiz</RouterLink>

              <RouterLink :to="{name: 'about'}" class="ml-4 invisible md:visible text-sm font-medium hover:bg-gray-100 hover:rounded-lg px-3 py-2">About</RouterLink>

              <RouterLink :to="{name: 'contact'}" class="ml-4 invisible md:visible text-sm font-medium hover:bg-gray-100 hover:rounded-lg px-3 py-2">Contact</RouterLink>
            </div>
          </div>
          <div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-7">
          </div>
          <div
            class="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden"
          >
            <!-- Mobile menu button -->
            <PopoverButton
              class="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span class="sr-only">Open menu</span>
              <Bars3Icon
                v-if="!open"
                class="block h-6 w-6"
                aria-hidden="true"
              />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </PopoverButton>
          </div>
          <div
            class="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4"
          >

            <Button label="🔔 Get Updates" @click="subscribe"/>
          </div>
        </div>
      </div>

      <PopoverPanel as="nav" class="lg:hidden" aria-label="Global">
        <div class="mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4">
          <a
            v-for="item in navigation"
            :key="item.name"
            :href="item.href"
            :aria-current="item.current ? 'page' : undefined"
            :class="[
              item.current ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50',
              'block rounded-md py-2 px-3 text-base font-medium',
            ]"
            >{{ item.name }}</a
          >
        </div>
        <div class="border-t border-gray-200 pt-4 pb-3">
          <!-- <div class="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800">
                {{ user.name }}
              </div>
              <div class="text-sm font-medium text-gray-500">
                {{ user.email }}
              </div>
            </div>
            <button
              type="button"
              class="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div> -->
          <!-- <div class="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
            <a
              v-for="item in userNavigation"
              :key="item.name"
              :href="item.href"
              class="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              >{{ item.name }}</a
            >
          </div> -->
        </div>
      </PopoverPanel>
      <SubscribeModal v-model="showSubscribe" />
      <BodyUpdater :open="open" />
    </header>
  </Popover>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import logo from "@/assets/images/logo.svg"
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import Button from "@/components/Button.vue";
import BodyUpdater from "@/unrendered/BodyUpdater.vue";
import SubscribeModal from "@/components/SubscribeModal.vue";
import { ref } from "vue";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Quiz", href: "/quiz", current: false },
  { name: "About", href: "/about", current: false },
  { name: "Contact", href: "/contact", current: false },
];

const showSubscribe = ref(false);

function subscribe() {
  showSubscribe.value = true;
}
</script>
