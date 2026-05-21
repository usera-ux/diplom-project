import { ref } from 'vue'
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '../services/firebase'

let confirmationResult = null

export function useAuth() {
  const loading = ref(false)
  const error   = ref(null)

  const initRecaptcha = (containerId = 'recaptcha-container') => {
    if (window.recaptchaVerifier) return window.recaptchaVerifier

    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
    })

    return window.recaptchaVerifier
  }

  const sendOtp = async (phone) => {
    loading.value = true
    error.value   = null
    try {
      const verifier = initRecaptcha()
      confirmationResult = await signInWithPhoneNumber(auth, phone, verifier)
      return true
    } catch (err) {
      console.error('sendOtp error:', err)
      console.error('СООБЩЕНИЕ:', err.message) // ← покажет точную причину
      error.value = _humanizeError(err.code)
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear()
        window.recaptchaVerifier = null
      }
      return false
    } finally {
      loading.value = false
    }
    
  }
  

  const verifyOtp = async (code) => {
    if (!confirmationResult) {
      error.value = 'Сначала отправьте код'
      return false
    }
    loading.value = true
    error.value   = null
    try {
      const result = await confirmationResult.confirm(code)
      return result.user
    } catch (err) {
      error.value = _humanizeError(err.code)
      return false
    } finally {
      loading.value = false
    }
  }

  const resendOtp = async (phone) => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear()
      window.recaptchaVerifier = null
    }
    return sendOtp(phone)
  }

  const logout = async () => await signOut(auth)
  const onAuthChange = (cb) => onAuthStateChanged(auth, cb)
  const getCurrentUser = () => auth.currentUser

  return { loading, error, sendOtp, verifyOtp, resendOtp, logout, onAuthChange, getCurrentUser }
}

const _humanizeError = (code) => {
  const map = {
    'auth/invalid-phone-number':      'Неверный формат номера телефона',
    'auth/too-many-requests':         'Слишком много попыток. Попробуйте позже',
    'auth/invalid-verification-code': 'Неверный код. Попробуйте ещё раз',
    'auth/code-expired':              'Код истёк. Запросите новый',
    'auth/missing-phone-number':      'Введите номер телефона',
    'auth/quota-exceeded':            'Превышен лимит SMS. Попробуйте позже',
    'auth/user-disabled':             'Аккаунт заблокирован',
    'auth/operation-not-allowed':     'Вход по телефону не включён в Firebase',
    'auth/network-request-failed':    'Нет соединения с интернетом',
  }
  return map[code] || `Ошибка: ${code}`
  
}