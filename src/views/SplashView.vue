<template>
  <div class="splash">
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <path class="logo-top" fill-rule="evenodd" clip-rule="evenodd" d="M7.27273 7.2727V24.2423H46.0606V31.515H6.06061C2.71343 31.515 0 28.8016 0 25.4544V6.06058C0 2.71342 2.71342 0 6.06061 0H61.8182C65.1654 0 67.8788 2.71341 67.8788 6.06058V32.4535H60.6061V7.2727H7.27273Z" fill="white"/>
      <path class="logo-bottom" fill-rule="evenodd" clip-rule="evenodd" d="M72.7273 72.7273V55.7577H21.8182V48.485H73.9394C77.2866 48.485 80 51.1984 80 54.5456V73.9394C80 77.2866 77.2866 80 73.9394 80H6.06059C2.71342 80 -1.52588e-05 77.2866 -1.52588e-05 73.9394V47.5709H7.27271V72.7273H72.7273Z" fill="white"/>
    </svg>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
     router.push('/onboarding')
  }, 1000)
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
}

.logo-top {
  animation: slideDown 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  animation-delay: 0s;
}

.logo-bottom {
  animation: slideUp 1s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  animation-delay: 0.5s;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>