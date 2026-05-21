<template>
  <div class="auth">

    <div id="recaptcha-container"></div>
    <div class="auth__top">
<div class="auth__logo">
 <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 6.25V3C0 1.75 1.51172 0 4.0117 0H36.4286C38.401 0 40 1.33775 40 2.98795V14.75C40 17.25 38.25 18.5 36 18.5H32H7C5.5 18.5 4.0117 18.5 4.0117 20.25V23.25V24H0V18.75C0 16 1.97599 14.5 4.7617 14.5H33.0117C35.0117 14.5 36.0117 14 36.0117 12.5V6C36.0117 4.5 34.7617 4 33.2617 4H5.5117C5.0117 4 4.0117 4.25 4.0117 5.5V6.25H0Z" fill="#00C27C"/>
<path d="M36.0117 28L10.9091 27.8788V24H39.9998C39.9995 25.25 40 25.5992 40 27.2728V36.9697C40 38.6433 38.6433 40 36.9697 40H4.01171C1.76172 40 -1.52588e-05 38.6433 -1.52588e-05 36.9697V23.7854H4.01171V34C4.01171 36.25 5.76171 36 6.26171 36C14.2617 35.9167 31.154 36 33.7617 36C34.3243 36 36.0117 36.25 36.0117 34V28Z" fill="#00C27C"/>
</svg>


  <div class="auth__logo-text">
    <span>GOOD</span>
    <span>2BEST</span>
  </div>
</div>
      
    </div>

    <div class="auth__body">
      <h1 class="auth__title">Авторизация</h1>
      <p class="auth__subtitle">Пожалуйста, введите номер телефона<br>для входа в приложение</p>

      <div class="auth__field" :class="{ 'auth__field--error': error }">
        <input
          ref="inputRef"
          class="auth__input"
          type="tel"
          placeholder="Номер телефона"
          v-model="phone"
          @input="onInput"
          @keyup.enter="onSubmit"
          maxlength="18"
        />
      </div>
      <p v-if="error" class="auth__error">{{ error }}</p>
    </div>

    <div class="auth__footer">
      <p class="auth__terms">
        Нажимая <b>Войти</b>, Вы соглашаетесь с
        <a href="#" class="auth__link">Условиями использования</a>
        и <a href="#" class="auth__link">Публичной офертой</a>
      </p>
      <button
        class="auth__btn"
        :class="{ 'auth__btn--active': isValid }"
        :disabled="!isValid || store.loading"
        @click="onSubmit"
      >
        <span v-if="store.loading">Отправка...</span>
        <span v-else>Войти</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const store  = useAuthStore()

const phone = ref('')
const error = ref('')

// Форматирование: +7 (777) 123-45-67
const onInput = () => {
  error.value = ''
  let digits = phone.value.replace(/\D/g, '')
  if (digits.startsWith('8')) digits = '7' + digits.slice(1)
  if (!digits.startsWith('7')) digits = '7' + digits
  digits = digits.slice(0, 11)

  let formatted = '+7'
  if (digits.length > 1) formatted += ' (' + digits.slice(1, 4)
  if (digits.length >= 4) formatted += ') ' + digits.slice(4, 7)
  if (digits.length >= 7) formatted += '-' + digits.slice(7, 9)
  if (digits.length >= 9) formatted += '-' + digits.slice(9, 11)

  phone.value = formatted
}

// Валидация: +7 (XXX) XXX-XX-XX = 18 символов
const isValid = computed(() => {
  const digits = phone.value.replace(/\D/g, '')
  return digits.length === 11
})

// Чистый номер для Supabase: +77771234567
const cleanPhone = computed(() => {
  const digits = phone.value.replace(/\D/g, '')
  return '+' + digits
})

const onSubmit = async () => {
  if (!isValid.value) return
  const ok = await store.sendOtp(cleanPhone.value)
  if (ok) {
    router.push({ name: 'otp', query: { phone: cleanPhone.value } })
  } else {
    error.value = store.error || 'Ошибка отправки кода'
  }
}
</script>

<style scoped>
.auth {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
  font-family: 'Manrope', sans-serif;
  padding: 0 24px;
  box-sizing: border-box;
}

.auth__top {
  display: flex;
  justify-content: center;
  padding-top: 80px;
  padding-bottom: 48px;
}

.auth__body {
  flex: 1;
}

.auth__title {
  font-weight: 700;
  font-size: 28px;
  color: #111D33;
  margin: 0 0 10px;
}

.auth__subtitle {
  font-size: 15px;
  line-height: 1.55;
  color: #848484;
  margin: 0 0 32px;
}

.auth__field {
  box-sizing: border-box;
  width: 100%;
  height: 56px;
  border: 1.5px solid #E2E8F0;
  border-radius: 14px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  transition: border-color 0.15s;
}

.auth__field:focus-within {
  border-color: #00C27C;
}

.auth__field--error {
  border-color: #EF4444;
}

.auth__input {
  width: 100%;
  border: none;
  outline: none;
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  color: #111D33;
  background: transparent;
}

.auth__input::placeholder {
  color: #C4C4C4;
}

.auth__error {
  font-size: 13px;
  color: #EF4444;
  margin: 8px 0 0;
}

.auth__footer {
  padding-bottom: 40px;
}

.auth__terms {
  font-size: 13px;
  line-height: 1.6;
  color: #848484;
  text-align: center;
  margin: 0 0 16px;
}

.auth__terms b {
  color: #111D33;
}

.auth__link {
  color: #00C27C;
  text-decoration: none;
  font-weight: 500;
}

.auth__btn {
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

.auth__btn--active {
  background: #00C27C;
  color: #fff;
  cursor: pointer;
}

.auth__btn--active:active {
  opacity: 0.85;
}
.auth__logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.auth__logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.auth__logo-text span {
  font-family: 'Manrope', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: #111D33;
}

</style>