// src/stores/authStore.js
import { defineStore } from 'pinia'
import { useAuth } from '../composables/useAuth'

let _authInstance = null  // ← синглтон, живёт между вызовами

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user:         null,
    loading:      false,
    error:        null,
    _unsubscribe: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    phone:      (state) => state.user?.phoneNumber ?? null,
  },

  actions: {
    // ── Один экземпляр useAuth на весь store ─────────────────────────────────
    _auth() {
      if (!_authInstance) {
        _authInstance = useAuth()  // создаётся только один раз
      }
      return _authInstance
    },

    async init() {
      const { onAuthChange } = this._auth()
      return new Promise((resolve) => {
        const unsubscribe = onAuthChange((firebaseUser) => {
          this.user = firebaseUser
          unsubscribe()
          resolve()
        })

        this._unsubscribe = onAuthChange((firebaseUser) => {
          this.user = firebaseUser
        })
      })
    },

    async sendOtp(phone) {
      this.loading = true
      this.error   = null

      const { sendOtp, error } = this._auth()
      const ok = await sendOtp(phone)

      this.error   = error.value
      this.loading = false
      return ok
    },

    async verifyOtp(_phone, code) {
      this.loading = true
      this.error   = null

      const { verifyOtp, error } = this._auth()
      const user = await verifyOtp(code)

      if (user) {
        this.user = user
      } else {
        this.error = error.value
      }

      this.loading = false
      return !!user
    },

    async resendOtp(phone) {
      this.loading = true
      this.error   = null

      const { resendOtp, error } = this._auth()
      const ok = await resendOtp(phone)

      this.error   = error.value
      this.loading = false
      return ok
    },

    async signOut() {
      const { logout } = this._auth()
      await logout()
      this.user = null
    },

    dispose() {
      if (this._unsubscribe) {
        this._unsubscribe()
        this._unsubscribe = null
      }
    },
  },
})