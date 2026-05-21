<template>
  <div class="otp">

    <!-- reCAPTCHA контейнер (невидимый) -->
    <div id="recaptcha-container"></div>

    <!-- Header -->
    <div class="otp__header">
      <button class="otp__back" @click="router.back()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 19L8 12L15 5" stroke="#111D33" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <!-- Body -->
    <div class="otp__body">
      <h1 class="otp__title">Подтверждение</h1>
      <p class="otp__subtitle">
        Введите 6-значный код отправленный вам на номер {{ formattedPhone }}
      </p>

      <!-- 6 ячеек -->
      <div class="otp__fields">
        <input
          v-for="(_, i) in 6"
          :key="i"
          :ref="el => { if (el) inputs[i] = el }"
          class="otp__cell"
          :class="{
            'otp__cell--filled': code[i],
            'otp__cell--error': hasError
          }"
          type="tel"
          inputmode="numeric"
          maxlength="1"
          :value="code[i] || ''"
          @input="onInput(i, $event)"
          @keydown="onKeydown(i, $event)"
          @paste="onPaste($event)"
        />
      </div>

      <p v-if="hasError" class="otp__error">{{ errorMessage }}</p>

      <!-- Таймер / кнопка повтора -->
      <div class="otp__resend">
        <span v-if="resendSeconds > 0" class="otp__resend-timer">
          Отправить код заново через:&nbsp;&nbsp;<b>{{ resendDisplay }}</b>
        </span>
        <button v-else class="otp__resend-btn" @click="onResend">
          Отправить повторно
        </button>
      </div>
    </div>

    <!-- Footer -->
    <div class="otp__footer">
      <button
        class="otp__btn"
        :class="{ 'otp__btn--active': isFilled }"
        :disabled="!isFilled || store.loading"
        @click="onSubmit"
      >
        <span v-if="store.loading">Проверка...</span>
        <span v-else>Подтвердить</span>
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const route  = useRoute()
const router = useRouter()
const store  = useAuthStore()

const phone = route.query.phone || ''

// ─── State ────────────────────────────────────────────────────────────────────
const code         = ref(Array(6).fill(''))
const inputs       = ref([])
const hasError     = ref(false)
const errorMessage = ref('')

// ─── Computed ─────────────────────────────────────────────────────────────────
const formattedPhone = computed(() => {
  const d = phone.replace(/\D/g, '')
  if (d.length !== 11) return phone
  return `+${d[0]} ${d.slice(1, 4)} ${d.slice(4, 7)} ${d.slice(7, 9)} ${d.slice(9, 11)}`
})

const isFilled = computed(() => code.value.every(c => c !== ''))
const fullCode  = computed(() => code.value.join(''))

// ─── Input handlers ───────────────────────────────────────────────────────────
const onInput = (i, e) => {
  hasError.value = false
  const val = e.target.value.replace(/\D/g, '').slice(-1)
  code.value[i] = val
  if (val && i < 5) inputs.value[i + 1]?.focus()
}

const onKeydown = (i, e) => {
  if (e.key === 'Backspace') {
    if (code.value[i]) {
      code.value[i] = ''
    } else if (i > 0) {
      code.value[i - 1] = ''
      inputs.value[i - 1]?.focus()
    }
  }
}

const onPaste = (e) => {
  const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
  if (!text) return
  e.preventDefault()
  text.split('').forEach((ch, i) => { code.value[i] = ch })
  inputs.value[Math.min(text.length, 5)]?.focus()
}

// ─── Submit ───────────────────────────────────────────────────────────────────
const onSubmit = async () => {
  if (!isFilled.value) return

  const ok = await store.verifyOtp(phone, fullCode.value)

  if (ok) {
    router.replace({ name: 'connection' })
  } else {
    showError(store.error || 'Неверный код. Попробуйте ещё раз.')
  }
}

const showError = (msg) => {
  hasError.value     = true
  errorMessage.value = msg
  code.value         = Array(6).fill('')
  inputs.value[0]?.focus()
}

// ─── Resend timer ─────────────────────────────────────────────────────────────
const resendSeconds = ref(120)
let resendInterval  = null

const resendDisplay = computed(() => {
  const m = Math.floor(resendSeconds.value / 60)
  const s = resendSeconds.value % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})

const startTimer = () => {
  clearInterval(resendInterval)
  resendSeconds.value = 120
  resendInterval = setInterval(() => {
    if (resendSeconds.value > 0) resendSeconds.value--
    else clearInterval(resendInterval)
  }, 1000)
}

const onResend = async () => {
  const ok = await store.resendOtp(phone)
  if (ok) {
    startTimer()
  } else {
    showError(store.error || 'Ошибка отправки. Попробуйте позже.')
  }
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
  startTimer()
  setTimeout(() => inputs.value[0]?.focus(), 100)
})

onUnmounted(() => clearInterval(resendInterval))
</script>

<style scoped>
.otp {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
  font-family: 'Manrope', sans-serif;
  padding: 0 16px;
  box-sizing: border-box;
}

.otp__header {
  padding-top: 52px;
  margin-bottom: 24px;
}

.otp__back {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
}

.otp__body {
  flex: 1;
}

.otp__title {
  font-weight: 800;
  font-size: 28px;
  color: #111D33;
  margin: 0 0 10px;
  letter-spacing: -0.3px;
}

.otp__subtitle {
  font-size: 15px;
  line-height: 1.6;
  color: #848484;
  margin: 0 0 40px;
  max-width: 280px;
}

/* ── OTP Cells — 6 штук, поэтому меньше размер ── */
.otp__fields {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
  width: 100%;
}

.otp__cell {
  box-sizing: border-box;
  width: 48px;
  height: 56px;
  flex: 1;
  border: 1px solid #111D33;
  border-radius: 12px;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 1;
  color: #111D33;
  background: #fff;
  outline: none;
  transition: border-color 0.15s, background 0.15s;
  caret-color: transparent;
  background-image: radial-gradient(circle, #979797 3px, transparent 3px);
  background-repeat: no-repeat;
  background-position: center;
  -webkit-appearance: none;
}

.otp__cell:focus {
  border-color: #00C27C;
  border-width: 2px;
  background-image: none;
}

.otp__cell--filled {
  border-color: #111D33;
  border-width: 1px;
  background-image: none;
}

.otp__cell--error {
  border-color: #EF4444 !important;
  background-color: #FFF5F5;
  background-image: none;
}

.otp__error {
  font-size: 13px;
  color: #EF4444;
  margin: -16px 0 16px;
  text-align: center;
}

.otp__resend {
  text-align: center;
}

.otp__resend-timer {
  font-size: 14px;
  color: #848484;
  display: inline-flex;
  align-items: center;
}

.otp__resend-timer b {
  color: #848484;
  font-weight: 400;
}

.otp__resend-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #00C27C;
  padding: 0;
}

.otp__footer {
  padding-bottom: 40px;
}

.otp__btn {
  width: 100%;
  height: 52px;
  background: #E2E8F0;
  color: #848484;
  border: none;
  border-radius: 100px;
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 16px;
  cursor: not-allowed;
  transition: background 0.2s, color 0.2s;
}

.otp__btn--active {
  background: #00C27C;
  color: #fff;
  cursor: pointer;
}

.otp__btn--active:active {
  opacity: 0.85;
}
</style>