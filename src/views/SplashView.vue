<template>
  <div class="splash">
    <div class="logo-wrapper">
      <svg
        class="logo"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 12.5V6C0 3.5 3.02344 0 8.02341 0H72.8571C76.802 0 80 2.6755 80 5.97589V29.5C80 34.5 76.5 37 72 37H64H14C11 37 8.02341 37 8.02341 40.5V46.5V48H0V37.5C0 32 3.95198 29 9.52341 29H66.0234C70.0234 29 72.0234 28 72.0234 25V12C72.0234 9 69.5234 8 66.5234 8H11.0234C10.0234 8 8.02341 8.5 8.02341 11V12.5H0Z"
          fill="white"
        />
        <path
          d="M72.0234 56L21.8182 55.7577V48H79.9996C79.9991 50.5 80 51.1984 80 54.5456V73.9394C80 77.2866 77.2866 80 73.9394 80H8.02342C3.52344 80 -3.05176e-05 77.2866 -3.05176e-05 73.9394V47.5709H8.02342V68C8.02342 72.5 11.5234 72 12.5234 72C28.5234 71.8333 62.3081 72 67.5234 72C68.6486 72 72.0234 72.5 72.0234 68V56Z"
          fill="white"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    router.push('/onboarding')
  }, 2000)
})
</script>
<style scoped>
.splash {
  width: 100%;
  height: 100vh;
  background: #00C27C;
  display: flex;
  align-items: center;
  justify-content: center;
   max-width: 390px;
  margin: 0 auto;
}

.logo {
  animation: logoAnimation 1.2s ease;
}

@keyframes logoAnimation {
  0% {
    opacity: 0;
    transform: scale(0.85);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>