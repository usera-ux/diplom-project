<template>
  <div class="connection">
    <div class="connection__spinner">
      <svg class="connection__circle" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" stroke="#00C27C" stroke-width="3" stroke-linecap="round" stroke-dasharray="31.4 94.2"/>
      </svg>
    </div>
    <h1 class="connection__title">Проверяем данные</h1>
    <p class="connection__subtitle">Подождите пару секунд...</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    router.replace({ name: 'pin-setup' })
  }, 2000)
})
</script>

<style scoped>
.connection {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background: #fff;
  font-family: 'Manrope', sans-serif;
  padding: 80px 24px 40px;
  box-sizing: border-box;
}

.connection__spinner {
  width: 40px;
  height: 40px;
  margin-bottom: 32px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.connection__circle {
  width: 100%;
  height: 100%;
}

.connection__title {
  font-weight: 700;
  font-size: 24px;
  color: #111D33;
  margin: 0 0 8px;
}

.connection__subtitle {
  font-size: 15px;
  color: #848484;
  margin: 0;
}
</style>