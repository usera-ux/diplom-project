<template>
  <div class="details">

    <!-- Header -->
    <div class="details__header">
      <button class="details__back-btn" @click="router.back()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="#111D33" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <h1 class="details__title">Детализация</h1>
      <button class="details__download-btn" @click="downloadReport">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 3v13M7 11l5 5 5-5" stroke="#111D33" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5 20h14" stroke="#111D33" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <!-- Общая сумма -->
    <div class="details__total-card">
      <p class="details__total-label">Общая сумма помощи</p>
      <div class="details__total-amount">
        <span class="details__total-value">{{ totalAmount }}</span>
        <span class="details__total-currency">₸</span>
      </div>
    </div>

    <!-- Фонды (горизонтальный скролл) -->
    <div class="details__funds-scroll">
      <div v-if="fundsLoading" class="details__funds-loading">
        <span>Загрузка фондов...</span>
      </div>
      <template v-else>
        <div
           v-for="fund in fundsWithAmounts"
  :key="fund.id"
  class="details__fund-card"
  :class="{ 'details__fund-card--active': selectedFundId === fund.id }"
  @click="selectedFundId = fund.id"
        >
          <div class="details__fund-logo">
            <img v-if="fund.logo_url" :src="fund.logo_url" :alt="fund.name" />
            <span v-else class="details__fund-initials">{{ fundInitials(fund.name) }}</span>
          </div>
          <div class="details__fund-info">
            <p class="details__fund-name">{{ fund.name }}</p>
            <p class="details__fund-amount">{{ fund.amount.toLocaleString('ru-RU') }} ₸</p>
          </div>
        </div>
      </template>
    </div>

    <!-- Товары -->
  <div class="details__items-wrap">
  <div
    v-for="item in allItems"
    :key="item.id"
    class="details__item-card"
     @click="router.push({ name: 'myhelp-product', params: { id: item.id } })"
  >
    <div class="details__item-header">
      <p class="details__item-name">{{ item.name }}</p>
    </div>
    <div class="details__item-rows">
      <div class="details__item-row">
        <span class="details__item-row-label">В фонд отправлено</span>
        <span class="details__item-row-value--green">
          {{ item.sentToFund.toLocaleString('ru-RU') }} ₸
        </span>
      </div>
      <div class="details__item-row">
        <span class="details__item-row-label">Сумма продажи</span>
        <span class="details__item-row-value--muted">
          {{ item.salePrice.toLocaleString('ru-RU') }} ₸
        </span>
      </div>
      <div class="details__item-row">
        <span class="details__item-row-label">Продано в</span>
        <span class="details__item-row-value--muted">
          {{ item.soldAt }}
        </span>
      </div>
    </div>
  </div>
</div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../services/supabase'

import { useNotificationsStore } from '../stores/notifications'

const notificationsStore = useNotificationsStore()
const router = useRouter()
const selectedFundId = ref(null)
const items = ref([])

// Фонды из Supabase
const funds = ref([])
const fundsLoading = ref(true)

onMounted(async () => {
  // Загружаем товары из localStorage
  const raw = JSON.parse(localStorage.getItem('favorites') || '[]')

  // Получаем fund_id для каждого товара из Supabase
  const ids = raw.map(i => i.id)
  let productFundMap = {}

  if (ids.length > 0) {
    const { data } = await supabase
      .from('products')
      .select('id, fund_id')
      .in('id', ids)

    if (data) {
      data.forEach(p => {
        if (p.fund_id) productFundMap[p.id] = p.fund_id
      })
    }
  }

  items.value = raw.map(item => ({
    ...item,
    status: item.status || 'review',
    fund_id: productFundMap[item.id] || null,
  }))

  // Загружаем фонды из Supabase
  const { data: fundsData, error } = await supabase
    .from('funds')
    .select('id, name, logo_url')
    .order('name')

  if (!error && fundsData) {
    funds.value = fundsData
  }

  fundsLoading.value = false
})

// Все товары с нормализованными полями
const allItems = computed(() => {
  return items.value.map(i => ({
    ...i,
    fundShort: i.fundShort || i.fundName || '—',
    sentToFund: i.sentToFund || Math.round((Number(i.price) || 0) * 0.8),
    salePrice: Number(i.price) || 0,
    soldAt: i.soldAt || '—',
  }))
})

// Фонды из Supabase с суммами из товаров
// Сопоставляем по fund_id или по имени (fundShort === fund.name)
const fundsWithAmounts = computed(() => {
  return funds.value.map(fund => {
    const matched = allItems.value.filter(
      i => i.fund_id === fund.id || i.fundShort === fund.name
    )
    const amount = matched.reduce((sum, i) => sum + i.sentToFund, 0)
    return {
      ...fund,
      amount,
    }
  })
})

const totalAmount = computed(() => {
  return allItems.value
    .reduce((sum, i) => sum + i.sentToFund, 0)
    .toLocaleString('ru-RU')
})

function fundInitials(name) {
  return name.slice(0, 3).toUpperCase()
}
const downloadReport = () => {
  router.push('/language')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; }

.details {
  min-height: 100vh;
  background: #fff;
  font-family: 'Manrope', sans-serif;
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
    max-width: 390px;
  margin: 0 auto;
}

/* Header */
.details__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 52px 16px 16px;
}

.details__back-btn,
.details__download-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.details__title {
  font-size: 18px;
  font-weight: 600;
  color: #111D33;
  margin: 0;
  text-align: center;
  flex: 1;
}

/* Total card */
.details__total-card {
  margin: 0 16px 20px;
  padding: 20px 16px;
  border: 1px solid #F0F0F0;
  border-radius: 16px;
  text-align: center;
}

.details__total-label {
  font-size: 14px;
  font-weight: 500;
  color: #848484;
  margin: 0 0 8px;
}

.details__total-amount {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.details__total-value {
  font-size: 36px;
  font-weight: 700;
  color: #00C27C;
}

.details__total-currency {
  font-size: 28px;
  font-weight: 700;
  color: #00C27C;
}

/* Funds scroll */
.details__funds-scroll {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 0 16px 20px;
}

.details__funds-loading {
  font-size: 13px;
  color: #848484;
  padding: 12px 0;
  display: flex;
  align-items: center;
}

.details__funds-scroll::-webkit-scrollbar {
  display: none;
}

.details__fund-card {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border: 1px solid #F0F0F0;
  border-radius: 12px;
  min-width: 160px;
}

.details__fund-logo {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background: #F7F8FA;
  display: flex;
  align-items: center;
  justify-content: center;
}

.details__fund-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.details__fund-initials {
  font-size: 11px;
  font-weight: 600;
  color: #848484;
}

.details__fund-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.details__fund-name {
  font-size: 12px;
  font-weight: 500;
  color: #848484;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
}

.details__fund-amount {
  font-size: 15px;
  font-weight: 700;
  color: #111D33;
  margin: 0;
}

.details__items-wrap {
  margin: 0 16px;
  border: 1px solid #F0F0F0;
  border-radius: 16px;
  overflow: hidden;
}

.details__item-card {
  padding: 20px 16px;
  border-bottom: 1px solid #F0F0F0;
}

.details__item-card:last-child {
  border-bottom: none;
}

.details__item-header {
  margin-bottom: 16px;
}

.details__item-name {
  font-size: 18px;
  font-weight: 400;
  color: #111D33;
  margin: 0;
}

.details__item-rows {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.details__item-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.details__item-row-label {
  font-size: 14px;
  color: #848484;
  font-weight: 400;
}

.details__item-row-value--green {
  font-size: 20px;
  font-weight: 500;
  color: #111D33;
}

.details__item-row-value--muted {
  font-size: 14px;
  font-weight: 400;
  color: #848484;
}
.details__fund-card--active {
  border-color: #00C27C;
}
.details__item-card {
  padding: 20px 16px;
  border-bottom: 1px solid #F0F0F0;
  cursor: pointer;          /* ← добавить */
  transition: background 0.15s;  /* ← добавить */
}

.details__item-card:active {
  background: #F7F8FA;      /* ← добавить */
}
</style>