<template>
    <ProfileUnauthorized v-if="!authStore.isLoggedIn" />
  <div v-else class="profile">
    <div class="profile__header">
      <h1 class="profile__title">Профиль</h1>
    </div>

    <div class="profile__list">
      <!-- Моя помощь -->
      <div class="profile__item" @click="router.push({ name: 'my-help' })">
        <div class="profile__item-left">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.25 12V1.5" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.25 4.5L11.25 1.5L14.25 4.5" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.25 12C18.3938 12.6862 19.3404 13.6569 19.9976 14.8177C20.6548 15.9784 21.0001 17.2896 21 18.6234V22.5" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.5 8.25H6C5.80109 8.25 5.61032 8.32902 5.46967 8.46967C5.32902 8.61032 5.25 8.80109 5.25 9V18.75" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.0897 22.5L13.0028 19.3125C12.7581 18.8821 12.6936 18.3723 12.8233 17.8945C12.953 17.4167 13.2665 17.0096 13.6953 16.762C14.1241 16.5144 14.6334 16.4465 15.1121 16.5731C15.5907 16.6996 15.9999 17.0104 16.2503 17.4375L17.2516 18.9666V9C17.2516 8.80109 17.1726 8.61032 17.0319 8.46967C16.8913 8.32902 16.7005 8.25 16.5016 8.25H15.0016" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          <span>Моя помощь</span>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="#888" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <!-- Личная информация -->
      <div class="profile__item" @click="router.push({ name: 'user-info' })">
        <div class="profile__item-left">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.25 10.5H18" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.25 13.5H18" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.25 4.5H3.75C3.33579 4.5 3 4.83579 3 5.25V18.75C3 19.1642 3.33579 19.5 3.75 19.5H20.25C20.6642 19.5 21 19.1642 21 18.75V5.25C21 4.83579 20.6642 4.5 20.25 4.5Z" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 13.5C10.2426 13.5 11.25 12.4926 11.25 11.25C11.25 10.0074 10.2426 9 9 9C7.75736 9 6.75 10.0074 6.75 11.25C6.75 12.4926 7.75736 13.5 9 13.5Z" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 15.75C6.33281 14.4562 7.60219 13.5 9 13.5C10.3978 13.5 11.6681 14.4553 12 15.75" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          <span>Личная информация</span>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="#888" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <!-- Изменить PIN-код -->
      <div class="profile__item" @click="router.replace({ name: 'pin-success' })">
        <div class="profile__item-left">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 3.5C6.55228 3.5 7 3.94772 7 4.5C7 5.05228 6.55228 5.5 6 5.5C5.44772 5.5 5 5.05228 5 4.5C5 3.94772 5.44772 3.5 6 3.5Z" fill="#848484" stroke="#848484"/>
<path d="M12 3.5C12.5523 3.5 13 3.94772 13 4.5C13 5.05228 12.5523 5.5 12 5.5C11.4477 5.5 11 5.05228 11 4.5C11 3.94772 11.4477 3.5 12 3.5Z" fill="#848484" stroke="#848484"/>
<path d="M18 3.5C18.5523 3.5 19 3.94772 19 4.5C19 5.05228 18.5523 5.5 18 5.5C17.4477 5.5 17 5.05228 17 4.5C17 3.94772 17.4477 3.5 18 3.5Z" fill="#848484" stroke="#848484"/>
<path d="M6 8.75C6.55228 8.75 7 9.19772 7 9.75C7 10.3023 6.55228 10.75 6 10.75C5.44772 10.75 5 10.3023 5 9.75C5 9.19772 5.44772 8.75 6 8.75Z" fill="#848484" stroke="#848484"/>
<path d="M12 11.25C12.8284 11.25 13.5 10.5784 13.5 9.75C13.5 8.92157 12.8284 8.25 12 8.25C11.1716 8.25 10.5 8.92157 10.5 9.75C10.5 10.5784 11.1716 11.25 12 11.25Z" fill="#848484"/>
<path d="M18 11.25C18.8284 11.25 19.5 10.5784 19.5 9.75C19.5 8.92157 18.8284 8.25 18 8.25C17.1716 8.25 16.5 8.92157 16.5 9.75C16.5 10.5784 17.1716 11.25 18 11.25Z" fill="#848484"/>
<path d="M6 16.5C6.82843 16.5 7.5 15.8284 7.5 15C7.5 14.1716 6.82843 13.5 6 13.5C5.17157 13.5 4.5 14.1716 4.5 15C4.5 15.8284 5.17157 16.5 6 16.5Z" fill="#848484"/>
<path d="M12 16.5C12.8284 16.5 13.5 15.8284 13.5 15C13.5 14.1716 12.8284 13.5 12 13.5C11.1716 13.5 10.5 14.1716 10.5 15C10.5 15.8284 11.1716 16.5 12 16.5Z" fill="#848484"/>
<path d="M12 21.75C12.8284 21.75 13.5 21.0784 13.5 20.25C13.5 19.4216 12.8284 18.75 12 18.75C11.1716 18.75 10.5 19.4216 10.5 20.25C10.5 21.0784 11.1716 21.75 12 21.75Z" fill="#848484"/>
<path d="M18 16.5C18.8284 16.5 19.5 15.8284 19.5 15C19.5 14.1716 18.8284 13.5 18 13.5C17.1716 13.5 16.5 14.1716 16.5 15C16.5 15.8284 17.1716 16.5 18 16.5Z" fill="#848484"/>
</svg>

          <span>Изменить PIN-код</span>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="#888" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <!-- Вход по биометрии -->
      <div class="profile__item">
        <div class="profile__item-left">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.875 3.75H20.25V7.125" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.875 20.25H20.25V16.875" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.125 20.25H3.75V16.875" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.125 3.75H3.75V7.125" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.75 12C10.3713 12 10.875 11.4963 10.875 10.875C10.875 10.2537 10.3713 9.75 9.75 9.75C9.12868 9.75 8.625 10.2537 8.625 10.875C8.625 11.4963 9.12868 12 9.75 12Z" fill="#848484"/>
<path d="M14.25 12C14.8713 12 15.375 11.4963 15.375 10.875C15.375 10.2537 14.8713 9.75 14.25 9.75C13.6287 9.75 13.125 10.2537 13.125 10.875C13.125 11.4963 13.6287 12 14.25 12Z" fill="#848484"/>
<path d="M14.25 14.25C13.7213 14.7188 12.7612 15 12 15C11.2388 15 10.2787 14.7188 9.75 14.25" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          <span>Вход по биометрии</span>
        </div>
        <div
          class="profile__toggle"
          :class="{ active: biometric }"
          @click="biometric = !biometric"
        >
          <div class="profile__toggle-thumb" />
        </div>
      </div>

      <!-- Язык интерфейса -->
      <div class="profile__item" @click="router.push({ name: 'language' })">
        <div class="profile__item-left">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.5 20.25L17.25 9.75L12 20.25" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.5 17.25H21" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 3V5.25" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 5.25H15" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 5.25C12 7.63695 11.0518 9.92613 9.36396 11.614C7.67613 13.3018 5.38695 14.25 3 14.25" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.51562 8.25C7.13612 10.005 8.28553 11.5245 9.80553 12.599C11.3255 13.6736 13.1413 14.2504 15.0028 14.25" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          <span>Язык интерфейса</span>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="#888" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <!-- FAQ -->
      <div class="profile__item" @click="router.push({ name: 'faq' })">
        <div class="profile__item-left">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 18C12.6213 18 13.125 17.4963 13.125 16.875C13.125 16.2537 12.6213 15.75 12 15.75C11.3787 15.75 10.875 16.2537 10.875 16.875C10.875 17.4963 11.3787 18 12 18Z" fill="#848484"/>
<path d="M12 13.5V12.75C13.6566 12.75 15 11.5744 15 10.125C15 8.67562 13.6566 7.5 12 7.5C10.3434 7.5 9 8.67562 9 10.125V10.5" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          <span>FAQ</span>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="#888" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <!-- Выйти -->
      <div class="profile__item profile__item--danger" @click="onLogout">
        <div class="profile__item-left">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 3.75H4.5V20.25H10.5" stroke="#F5463B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 12H21" stroke="#F5463B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.25 8.25L21 12L17.25 15.75" stroke="#F5463B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          <span>Выйти</span>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <LogoutModal v-model="showLogoutModal" />
    </div>

    <p class="profile__version">Версия приложения v0.1.1</p>

    <BottomNav />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import BottomNav from '../components/BottomNav.vue'
import LogoutModal from '../components/LogoutModal.vue'
import ProfileUnauthorized from './ProfileUnauthorized.vue'

const router = useRouter()
const authStore = useAuthStore()
const biometric = ref(true)
const showLogoutModal = ref(false)
const onLogout = () => { showLogoutModal.value = true }

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; }

.profile {
  min-height: 100vh;
  background: #fff;
  font-family: 'Manrope', sans-serif;
  padding-bottom: 100px;
}

.profile__header {
  padding: 52px 20px 24px;
}

.profile__title {
  font-weight: 700;
  font-size: 24px;
  color: #111D33;
  margin: 0;
  text-align: center;
}

.profile__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 16px;
}

.profile__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: #fff;
  border: 1px solid #F0F0F0;
  border-radius: 16px;
  cursor: pointer;
  transition: background 0.15s;
}

.profile__item:active {
  background: #F7F8FA;
}

.profile__item-left {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  font-weight: 500;
  color: #111D33;
}

.profile__item--danger .profile__item-left {
  color: #EF4444;
}

/* Toggle */
.profile__toggle {
  width: 48px;
  height: 28px;
  border-radius: 14px;
  background: #E2E8F0;
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
}

.profile__toggle.active {
  background: #00C27C;
}

.profile__toggle-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.2s;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
}

.profile__toggle.active .profile__toggle-thumb {
  transform: translateX(20px);
}

.profile__version {
  text-align: center;
  font-size: 12px;
  color: #BABABA;
  margin: 32px 0 0;
}
</style>