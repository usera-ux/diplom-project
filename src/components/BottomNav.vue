<template>
  <div class="nav">
   <button
  v-for="tab in tabs"
  :key="tab.id"
  class="nav__btn"
  :class="{ active: route.name === tab.route || (tab.route === 'funds' && route.name === 'fund') }"
  @click="router.push({ name: tab.route })"
>
      <span v-html="tab.icon" />
      <span>{{ tab.name }}</span>
    </button>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const tabs = [
  {
    id: 'catalogue',
    name: 'Каталог',
    route: 'catalogue',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M4.5 13.0859V20.2494H19.5V13.0859" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.0625 3.75H18.9375C19.1004 3.75003 19.2589 3.80311 19.389 3.90122C19.519 3.99932 19.6136 4.13711 19.6584 4.29375L21 9H3L4.34438 4.29375C4.38904 4.13757 4.48321 4.00012 4.61272 3.90206C4.74222 3.804 4.90006 3.75064 5.0625 3.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 9V10.5C9 11.2956 8.68393 12.0587 8.12132 12.6213C7.55871 13.1839 6.79565 13.5 6 13.5C5.20435 13.5 4.44129 13.1839 3.87868 12.6213C3.31607 12.0587 3 11.2956 3 10.5V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 9V10.5C15 11.2956 14.6839 12.0587 14.1213 12.6213C13.5587 13.1839 12.7956 13.5 12 13.5C11.2044 13.5 10.4413 13.1839 9.87868 12.6213C9.31607 12.0587 9 11.2956 9 10.5V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21 9V10.5C21 11.2956 20.6839 12.0587 20.1213 12.6213C19.5587 13.1839 18.7956 13.5 18 13.5C17.2044 13.5 16.4413 13.1839 15.8787 12.6213C15.3161 12.0587 15 11.2956 15 10.5V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
  },
  {
    id: 'favorites',
    name: 'Избранные',
    route: 'favorites',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`
  },
  {
    id: 'funds',
    name: 'Фонды',
    route: 'funds' ,
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M20.25 6H3.75C3.33579 6 3 6.33579 3 6.75V18.75C3 19.1642 3.33579 19.5 3.75 19.5H20.25C20.6642 19.5 21 19.1642 21 18.75V6.75C21 6.33579 20.6642 6 20.25 6Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.75 6V4.5C15.75 4.10218 15.592 3.72064 15.3107 3.43934C15.0294 3.15804 14.6478 3 14.25 3H9.75C9.35218 3 8.97064 3.15804 8.68934 3.43934C8.40804 3.72064 8.25 4.10218 8.25 4.5V6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21 11.0918C18.2649 12.6743 15.1599 13.5052 12 13.5002C8.84021 13.5053 5.73527 12.6747 3 11.0927" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 10.5H13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
  },
  {
    id: 'purchases',
    name: 'Покупки',
    route: 'purchases',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M20.25 4.5H3.75C3.33579 4.5 3 4.83579 3 5.25V18.75C3 19.1642 3.33579 19.5 3.75 19.5H20.25C20.6642 19.5 21 19.1642 21 18.75V5.25C21 4.83579 20.6642 4.5 20.25 4.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.75 8.25C15.75 9.24456 15.3549 10.1984 14.6517 10.9017C13.9484 11.6049 12.9946 12 12 12C11.0054 12 10.0516 11.6049 9.34835 10.9017C8.64509 10.1984 8.25 9.24456 8.25 8.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
  },
  {
    id: 'profile',
    name: 'Профиль',
    route: 'profile',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 15C14.0711 15 15.75 13.3211 15.75 11.25C15.75 9.17893 14.0711 7.5 12 7.5C9.92893 7.5 8.25 9.17893 8.25 11.25C8.25 13.3211 9.92893 15 12 15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.98438 18.6904C6.54867 17.5789 7.40971 16.6454 8.47207 15.9933C9.53443 15.3413 10.7566 14.9961 12.0031 14.9961C13.2496 14.9961 14.4718 15.3413 15.5342 15.9933C16.5965 16.6454 17.4576 17.5789 18.0219 18.6904" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
  },
]
</script>

<style scoped>
.nav {
  position: fixed;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 343px;
  height: 72px;
  background: rgba(255, 255, 255, 0.545);
  box-shadow: 0px 16px 16px -4px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(4px);
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  z-index: 100;
  box-sizing: border-box;
}

.nav__btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex: 1;
  height: 56px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: 10px;
  line-height: 10px;
  color: #111D33;
  padding: 0;
  transition: color 0.2s;
}

.nav__btn.active {
  color: #00C27C;
}
</style>