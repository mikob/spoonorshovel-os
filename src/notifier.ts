import { useNotificationStore } from "@/stores/NotificationStore";

export function notify(
  title: string,
  message?: string,
  isSuccess: boolean = true
) {
  const notificationStore = useNotificationStore();

  notificationStore.notification = {
    title,
    message,
    isSuccess,
    timestamp: +new Date(),
  };
}
