<template>
  <div class="bio">
    <!-- Header -->
    <div class="bio__header">
      <button class="bio__skip" @click="onSkip">Пропустить</button>
    </div>

    <!-- Body -->
    <div class="bio__body">
      <div class="bio__icons">
        <!-- Fingerprint -->
       <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.0859 40.4512C13.0075 36.5823 14.0042 32.3199 13.9975 28C13.9938 25.8995 14.464 23.8251 15.3729 21.9315C16.2819 20.0378 17.6063 18.3735 19.2475 17.0625" stroke="#00C27C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M28 28C28.0104 35.1176 26.2033 42.12 22.75 48.3438" stroke="#00C27C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21 28C21 26.1435 21.7375 24.363 23.0503 23.0503C24.363 21.7375 26.1435 21 28 21C29.8565 21 31.637 21.7375 32.9497 23.0503C34.2625 24.363 35 26.1435 35 28C35.0102 35.2155 33.4203 42.3436 30.345 48.8709" stroke="#00C27C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M47.8112 40.25C48.6048 36.215 49.0033 32.1123 49.0012 28C49.0012 22.4305 46.7888 17.089 42.8505 13.1508C38.9122 9.21249 33.5708 7 28.0012 7C22.4317 7 17.0903 9.21249 13.152 13.1508C9.21374 17.089 7.00125 22.4305 7.00125 28C7.00353 30.3844 6.59887 32.7517 5.80469 35" stroke="#00C27C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.2997 35C19.5522 38.6795 18.2137 42.2136 16.3359 45.465" stroke="#00C27C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M26.25 14.1091C26.8306 14.038 27.415 14.0022 28 14.002C31.713 14.002 35.274 15.4769 37.8995 18.1025C40.525 20.728 42 24.2889 42 28.002C41.9984 30.3421 41.8523 32.6798 41.5625 35.002" stroke="#00C27C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M40.2347 42C39.9022 43.295 39.5245 44.571 39.1016 45.8281" stroke="#00C27C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M39.375 8.75H47.25V16.625" stroke="#00C27C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M39.375 47.25H47.25V39.375" stroke="#00C27C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.625 47.25H8.75V39.375" stroke="#00C27C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.625 8.75H8.75V16.625" stroke="#00C27C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M28 42C35.732 42 42 35.732 42 28C42 20.268 35.732 14 28 14C20.268 14 14 20.268 14 28C14 35.732 20.268 42 28 42Z" stroke="#00C27C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22.75 23.75C23.6475 23.75 24.375 24.4775 24.375 25.375C24.375 26.2725 23.6475 27 22.75 27C21.8525 27 21.125 26.2725 21.125 25.375C21.125 24.4775 21.8525 23.75 22.75 23.75Z" fill="#00C27C" stroke="#00C27C" stroke-width="2"/>
<path d="M33.25 23.75C34.1475 23.75 34.875 24.4775 34.875 25.375C34.875 26.2725 34.1475 27 33.25 27C32.3525 27 31.625 26.2725 31.625 25.375C31.625 24.4775 32.3525 23.75 33.25 23.75Z" fill="#00C27C" stroke="#00C27C" stroke-width="2"/>
<path d="M33.25 33.25C32.0163 34.3438 29.7762 35 28 35C26.2238 35 23.9837 34.3438 22.75 33.25" stroke="#00C27C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      </div>

      <h1 class="bio__title">Вход по отпечатку<br>пальца или лицу</h1>
      <p class="bio__subtitle">Включите для быстрого входа в<br>приложение</p>
    </div>

    <!-- Popup симуляция Face ID -->
    <div v-if="showPopup" class="popup__overlay">
      <div class="popup">
        <svg width="48" height="48" viewBox="0 0 64 64" fill="none" :class="{ 'scanning': isScanning, 'success': isSuccess }">
          <path d="M14 24V16H22" stroke="#00C27C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M50 24V16H42" stroke="#00C27C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14 40V48H22" stroke="#00C27C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M50 40V48H42" stroke="#00C27C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M26 28V30" stroke="#00C27C" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M38 28V30" stroke="#00C27C" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M32 28V35" stroke="#00C27C" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M26 38C26 38 28 42 32 42C36 42 38 38 38 38" stroke="#00C27C" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
        <p class="popup__title">{{ popupText }}</p>
        <button class="popup__cancel" @click="showPopup = false">Отмена</button>
      </div>
    </div>

    <!-- Footer -->
    <div class="bio__footer">
      <button class="bio__btn" @click="onEnable">Включить</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const showPopup = ref(false)
const isScanning = ref(false)
const isSuccess = ref(false)
const popupText = ref('Посмотрите в камеру')

const onEnable = async () => {
  showPopup.value = true
  isScanning.value = true
  isSuccess.value = false
  popupText.value = 'Посмотрите в камеру'

  // Симуляция сканирования — 1.5 сек
  await new Promise(r => setTimeout(r, 1500))

  isScanning.value = false
  isSuccess.value = true
  popupText.value = 'Face ID подтверждён ✓'

  // Небольшая пауза и переход
  await new Promise(r => setTimeout(r, 800))

  showPopup.value = false
  router.replace({ name: 'catalogue' })
}

const onSkip = () => {
  router.replace({ name: 'catalogue' })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&display=swap');

.bio {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
  font-family: 'Manrope', sans-serif;
  box-sizing: border-box;
}

.bio__header {
  display: flex;
  justify-content: flex-end;
  padding: 52px 24px 0;
}

.bio__skip {
  background: none;
  border: none;
  font-family: 'Manrope', sans-serif;
  font-weight: 500;
  font-size: 15px;
  color: #111D33;
  cursor: pointer;
  padding: 0;
}

.bio__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  margin-top: -60px;
}

.bio__icons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
}

.bio__title {
  font-weight: 700;
  font-size: 22px;
  line-height: 30px;
  color: #111D33;
  text-align: center;
  margin: 0 0 12px;
}

.bio__subtitle {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #979797;
  text-align: center;
  margin: 0;
}

.bio__footer {
  padding: 0 16px 48px;
}

.bio__btn {
  width: 100%;
  height: 56px;
  background: #00C27C;
  border: none;
  border-radius: 16px;
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  transition: background 0.15s;
}

.bio__btn:active {
  background: #00a868;
}

/* Popup */
.popup__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 100;
}

.popup {
  background: #fff;
  width: 100%;
  border-radius: 24px 24px 0 0;
  padding: 32px 24px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.popup__title {
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #111D33;
  margin: 0;
}

.popup__cancel {
  background: none;
  border: none;
  font-family: 'Manrope', sans-serif;
  font-size: 15px;
  color: #979797;
  cursor: pointer;
  margin-top: 4px;
}

/* Анимация сканирования */
.scanning {
  animation: pulse 0.8s ease-in-out infinite;
}

.success {
  filter: drop-shadow(0 0 8px #00C27C);
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.08); }
}
</style>