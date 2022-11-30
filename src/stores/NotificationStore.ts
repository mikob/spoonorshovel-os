import { defineStore } from "pinia";
import { ref } from "vue";

interface Notification {
  title: string;
  message?: string;
  isSuccess?: boolean;
  timestamp: number | null;
}

export const useNotificationStore = defineStore("notifications", () => {
  const notification = ref<Notification>({
    title: "",
    message: "",
    timestamp: null,
  });

  return {
    notification,
  };
});
