<template>
  <div class="pin">
    <!-- Header -->
    <div class="pin__header">
      <button class="pin__skip" @click="onSkip">Пропустить</button>
    </div>

    <!-- Body -->
    <div class="pin__body">
      <div class="pin__icon">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="6.25" y="13.75" width="27.5" height="20" rx="3" stroke="#00C27C" stroke-width="2"/>
          <path d="M13.75 13.75V10a6.25 6.25 0 0 1 12.5 0v3.75" stroke="#00C27C" stroke-width="2" stroke-linecap="round"/>
          <circle cx="20" cy="24" r="2" fill="#111D33"/>
        </svg>
      </div>

      <h1 class="pin__title">Установите код<br>быстрого доступа</h1>
      <p class="pin__subtitle">С помощью него вы можете<br>заходить в приложение</p>

      <!-- Dots block -->
      <div class="pin__dots-block">

        <!-- Верхний ряд: шаг 1 — текущий ввод, шаг 2 — первый PIN (все зелёные) -->
        <div class="pin__dots">
          <span
            v-for="i in 4"
            :key="'first-' + i"
            class="pin__dot"
            :class="{
              'pin__dot--filled': step === 1 ? pin.length >= i : true
            }"
          />
        </div>

        <!-- Нижний ряд: появляется только на шаге 2 — ввод подтверждения -->
        <div v-if="step === 2" class="pin__dots">
          <span
            v-for="i in 4"
            :key="'second-' + i"
            class="pin__dot"
            :class="{
              'pin__dot--filled': pin.length >= i && !hasError,
              'pin__dot--error': pin.length >= i && hasError
            }"
          />
        </div>

      </div>
    </div>

    <!-- Numpad -->
    <div class="pin__numpad">
      <button
        v-for="n in [1,2,3,4,5,6,7,8,9]"
        :key="n"
        class="pin__key"
        @click="onKey(String(n))"
      >{{ n }}</button>

      <div class="pin__key pin__key--empty" />
      <button class="pin__key" @click="onKey('0')">0</button>
      <button class="pin__key pin__key--back" @click="onBack">
        <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
          <path d="M10 1L1 11L10 21H27V1H10Z" stroke="#111D33" stroke-width="2" stroke-linejoin="round"/>
          <path d="M21 7L14 14M14 7L21 14" stroke="#111D33" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <!-- Snackbar (Figma: 343×48, left:16, bottom:34, radius:6, #F5463B) -->
    <transition name="toast">
      <div v-if="hasError" class="pin__snackbar">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2.5L17.5 16.5H2.5L10 2.5Z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M10 8.5V11.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
          <circle cx="10" cy="14" r="0.8" fill="white"/>
        </svg>
        <span>PIN-код не совпадает</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const step = ref(1)
const firstPin = ref('')
const pin = ref('')
const hasError = ref(false)

const onKey = (digit) => {
  if (hasError.value) return
  if (pin.value.length < 4) {
    pin.value += digit

    if (pin.value.length === 4) {
      if (step.value === 1) {
        firstPin.value = pin.value
        setTimeout(() => {
          pin.value = ''
          step.value = 2
        }, 300)
      } else {
        if (pin.value === firstPin.value) {
          localStorage.setItem('userPin', pin.value)
          setTimeout(() => router.replace({ name: 'biometric' }), 300)
        } else {
          hasError.value = true
          setTimeout(() => {
            hasError.value = false
            pin.value = ''
            firstPin.value = ''
            step.value = 1
          }, 2000)
        }
      }
    }
  }
}

const onBack = () => {
  if (!hasError.value) {
    pin.value = pin.value.slice(0, -1)
  }
}

const onSkip = () => {
  router.replace({ name: 'catalogue' })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&family=Inter:wght@600&display=swap');
* {
  -webkit-tap-highlight-color: transparent;
}
.pin {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
  font-family: 'Manrope', sans-serif;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
   touch-action: manipulation;
}
.pin__key,
.pin__skip {
  touch-action: manipulation;
}
.pin__header {
  display: flex;
  justify-content: flex-end;
  padding: 52px 24px 0;
}

.pin__skip {
  background: none;
  border: none;
  font-family: 'Manrope', sans-serif;
  font-weight: 500;
  font-size: 15px;
  color: #111D33;
  cursor: pointer;
  padding: 0;
}

.pin__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32px;
}

.pin__icon {
  margin-bottom: 16px;
}

.pin__title {
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #111D33;
  text-align: center;
  margin: 0 0 8px;
}

.pin__subtitle {
  font-family: 'Manrope', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #979797;
  text-align: center;
  margin: 0 0 24px;
}

/* Dots */
.pin__dots-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.pin__dots {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 26px;
}

.pin__dot {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #E2E8F0;
  transition: background 0.15s;
  flex-shrink: 0;
}

.pin__dot--filled {
  background: #00C27C;
}

.pin__dot--error {
  background: #F5463B;
}

/* Numpad */
.pin__numpad {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  align-content: flex-end;
  gap: 28px;
  width: 281px;
  height: 384px;
  margin: 0 auto;
  padding-bottom: 25px;
  box-sizing: border-box;
}

.pin__key {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 75px;
  height: 75px;
  min-width: 75px;
  min-height: 75px;

  border-radius: 50%;
  border: none;
  background: #F6F6F6;

  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 40px;
  line-height: 1;
  color: #111D33;

  cursor: pointer;
  flex: none;
  flex-grow: 0;

  -webkit-tap-highlight-color: transparent;
  user-select: none;
  transition: background 0.1s;
}

.pin__key:active {
  background: #E0E0E0;
}

.pin__key--empty {
  background: transparent;
  cursor: default;
  pointer-events: none;
}

.pin__key--back {
  background: #F6F6F6;
}

/* Snackbar — точно по Figma */
.pin__snackbar {
  position: absolute;
  width: 343px;
  height: 48px;
  left: 16px;
  bottom: 34px;
  background: #F5463B;
  border-radius: 6px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;

  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: 15px;
  color: #fff;
}

.toast-enter-active,
.toast-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>