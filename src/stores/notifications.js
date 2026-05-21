import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref(
    JSON.parse(localStorage.getItem('notifications') || '[]')
  )

  function save() {
    localStorage.setItem(
      'notifications',
      JSON.stringify(notifications.value)
    )
  }

  function addNotification(notification) {
    notifications.value.unshift({
      id: Date.now(),
      ...notification,
    })

    save()
  }

  function clearNotifications() {
    notifications.value = []
    save()
  }

  return {
    notifications,
    addNotification,
    clearNotifications,
  }
})