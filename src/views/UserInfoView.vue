<template>
  <div class="userinfo">
    <div class="userinfo__header">
      <button class="userinfo__back" @click="router.back()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 19L8 12L15 5" stroke="#111D33" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <span class="userinfo__title">Личная информация</span>
      <div style="width:24px"/>
    </div>

    <div class="userinfo__form">
      <div class="userinfo__field">
        <label class="userinfo__label">Номер телефона</label>
        <input
          class="userinfo__input userinfo__input--phone"
          type="tel"
          :value="phone"
          placeholder="+7 000 000 0000"
          @input="onPhoneInput"
          @keydown="onPhoneKeydown"
        />
      </div>

      <div class="userinfo__field">
        <input
          class="userinfo__input"
          type="text"
          v-model="fullName"
          placeholder="ФИО"
        />
      </div>

      <div class="userinfo__field">
        <input
          class="userinfo__input"
          type="text"
          v-model="iin"
          placeholder="ИИН"
          maxlength="12"
          inputmode="numeric"
          @input="iin = iin.replace(/\D/g, '')"
        />
      </div>
    </div>

    <div class="userinfo__footer">
      <button class="userinfo__btn" @click="goToNotifications"  >Сохранить</button>
    </div>

    <!-- Toast -->
<div v-if="showToast" class="toast">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#00C27C"/>
    <path d="M8 12L11 15L16 9" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  Данные сохранены
</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../services/supabase'

const router = useRouter()
const phone = ref('+7 ')
const fullName = ref('')
const iin = ref('')

const goToNotifications = () => {
  router.push('/profile')
}

const onPhoneInput = (e) => {
  let val = e.target.value
  if (!val.startsWith('+7')) {
    val = '+7 ' + val.replace(/^\+7\s?/, '')
  }
  let digits = val.slice(2).replace(/\D/g, '')
  let formatted = '+7'
  if (digits.length > 0) formatted += ' ' + digits.slice(0, 3)
  if (digits.length > 3) formatted += ' ' + digits.slice(3, 6)
  if (digits.length > 6) formatted += ' ' + digits.slice(6, 10)
  phone.value = formatted
}

const onPhoneKeydown = (e) => {
  if ((e.key === 'Backspace' || e.key === 'Delete') && phone.value.length <= 3) {
    e.preventDefault()
  }
}

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const userPhone = user.phone || ''
  if (userPhone) {
    const digits = userPhone.replace(/\D/g, '').slice(1)
    let formatted = '+7'
    if (digits.length > 0) formatted += ' ' + digits.slice(0, 3)
    if (digits.length > 3) formatted += ' ' + digits.slice(3, 6)
    if (digits.length > 6) formatted += ' ' + digits.slice(6, 10)
    phone.value = formatted
  } else {
    phone.value = '+7 '
  }

  const { data } = await supabase
    .from('profiles')
    .select('full_name, iin')
    .eq('id', user.id)
    .single()

  if (data) {
    fullName.value = data.full_name || ''
    iin.value = data.iin || ''
  }
})

const showToast = ref(false)

const onSave = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      full_name: fullName.value,
      iin: iin.value,
    })

  // Показываем toast и возвращаемся
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
    router.back()
  }, 1500)
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; }

.userinfo {
  min-height: 100vh;
  background: #fff;
  font-family: 'Manrope', sans-serif;
  display: flex;
  flex-direction: column;
  max-width: 390px;
  margin: 0 auto;
}

.userinfo__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 52px 20px 24px;
}

.userinfo__back {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
}

.userinfo__title {
  font-weight: 700;
  font-size: 17px;
  color: #111D33;
}

.userinfo__form {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 16px;
}

.userinfo__field {
  position: relative;
  display: flex;
  flex-direction: column;
}

.userinfo__label {
  position: absolute;
  top: 10px;
  left: 20px;
  font-size: 11px;
  color: #979797;
  pointer-events: none;
  z-index: 1;
}

.userinfo__input {
  width: 100%;
  height: 56px;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  padding: 0 16px;
  font-family: 'Manrope', sans-serif;
  font-size: 15px;
  color: #111D33;
  outline: none;
  background: #fff;
  transition: border-color 0.15s;
}

.userinfo__input--phone {
  height: 68px;
  padding-top: 22px;
  padding-bottom: 8px;
}

.userinfo__input:focus {
  border-color: #00C27C;
}

.userinfo__input::placeholder {
  color: #BABABA;
}

.userinfo__footer {
  padding: 16px 16px 40px;
}

.userinfo__btn {
  width: 100%;
  height: 56px;
  background: #00C27C;
  border: none;
  border-radius: 16px;
  font-family: 'Manrope', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #111D33;
  cursor: pointer;
  transition: background 0.15s;
}

.userinfo__btn:active {
  background: #00a868;
}
.toast {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  background: #111D33;
  color: #fff;
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 500;
  padding: 12px 20px;
  border-radius: 20px;
  white-space: nowrap;
  z-index: 999;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateX(-50%) translateY(10px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}
</style>