<template>
  <div class="funds">
    <!-- Header -->
    <div class="funds__header">
      <h1 class="funds__title">Фонды</h1>
    </div>

    <!-- List -->
    <div class="funds__list">
      <div
        class="fund-card"
        v-for="fund in funds"
        :key="fund.id"
        @click="router.push({ name: 'fund', params: { id: fund.id } })"
      >
        <div class="fund-card__top">
          <div class="fund-card__logo-wrap">
            <img :src="fund.logo" :alt="fund.name" class="fund-card__logo" />
          </div>
          <div class="fund-card__info">
            <h2 class="fund-card__name">{{ fund.name }}</h2>
            <p class="fund-card__desc">{{ fund.description }}</p>
          </div>
        </div>
        <div class="fund-card__divider" />
        <div class="fund-card__bottom">
          <span class="fund-card__label">Передано товаров</span>
          <span class="fund-card__count">{{ fund.itemsCount }}</span>
        </div>
      </div>
    </div>
    <BottomNav />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../services/supabase'
import BottomNav from '../components/BottomNav.vue'

const router = useRouter()
const funds = ref([])
const loading = ref(true)

onMounted(async () => {
  const { data, error } = await supabase
    .from('funds')
    .select(`
      id,
      name,
      description,
      logo_url,
      fund_items (count)
    `)
    .order('created_at', { ascending: true })

  if (!error) {
    funds.value = data.map(f => ({
      ...f,
      logo: f.logo_url,
      itemsCount: f.fund_items[0]?.count ?? 0
    }))
  }
  loading.value = false
})

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; }

.funds {
  min-height: 100vh;
  background: #fff;
  font-family: 'Manrope', sans-serif;
  padding-bottom: 80px;
}

.funds__header {
  padding: 52px 20px 16px;
}

.funds__title {
  font-weight: 700;
  font-size: 24px;
  color: #111D33;
  margin: 0;
  text-align: center;
}

.funds__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 16px;
}

/* Card */
.fund-card {
  background: #fff;
  border: 1px solid #EFEFEF;
  border-radius: 16px;
  padding: 16px;
  cursor: pointer;
  transition: box-shadow 0.15s;
}

.fund-card:active {
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

.fund-card__top {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.fund-card__logo-wrap {
  width: 72px;
  height: 72px;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid #F0F0F0;
  flex-shrink: 0;
}

.fund-card__logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fund-card__info {
  flex: 1;
}

.fund-card__name {
  font-weight: 700;
  font-size: 16px;
  color: #111D33;
  margin: 0 0 6px;
  line-height: 1.3;
}

.fund-card__desc {
  font-size: 13px;
  line-height: 1.5;
  color: #6B7280;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.fund-card__divider {
  height: 1px;
  background: #F5F5F5;
  margin: 14px 0;
}

.fund-card__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.fund-card__label {
  font-size: 14px;
  font-weight: 500;
  color: #111D33;
}

.fund-card__count {
  background: #E8FBF4;
  color: #00C27C;
  font-size: 13px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
}
</style>