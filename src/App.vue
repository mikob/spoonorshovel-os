<template>
  <Header />
  <RouterView />
  <Footer />
  <Notification />
</template>

<style scoped></style>

<script setup lang="ts">
import { RouterView } from "vue-router";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import Notification from "@/components/Notification.vue";
</script>
