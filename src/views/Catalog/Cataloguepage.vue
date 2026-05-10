<template>
  <div class="catalogue">

    <!-- Header -->
    <div class="catalogue__header">
  <div style="width: 24px;" />   <!-- пустышка слева для баланса -->
  <h1 class="catalogue__title">Каталог</h1>
  <button class="catalogue__bell">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 21H15" stroke="#111D33" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.2533 9.75C5.2533 7.95979 5.96446 6.2429 7.23033 4.97703C8.4962 3.71116 10.2131 3 12.0033 3C13.7935 3 15.5104 3.71116 16.7763 4.97703C18.0421 6.2429 18.7533 7.95979 18.7533 9.75C18.7533 13.1081 19.5314 15.8063 20.1502 16.875C20.2159 16.9888 20.2505 17.1179 20.2507 17.2493C20.2508 17.3808 20.2164 17.5099 20.1508 17.6239C20.0853 17.7378 19.991 17.8325 19.8774 17.8985C19.7637 17.9645 19.6347 17.9995 19.5033 18H4.5033C4.37203 17.9992 4.24327 17.964 4.12988 17.8978C4.0165 17.8317 3.92246 17.7369 3.85716 17.6231C3.79187 17.5092 3.75761 17.3801 3.75781 17.2489C3.75801 17.1176 3.79266 16.9887 3.8583 16.875C4.47611 15.8063 5.2533 13.1072 5.2533 9.75Z" stroke="#111D33" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  </button>
</div>

   
<div class="catalogue__stories">
  <div
    v-for="(story, i) in stories"
    :key="i"
    class="catalogue__story"
    @click="openStory(i)"
  >
    <div class="catalogue__story-ring">
      <div class="catalogue__story-img" v-html="story.svg" />
    </div>
  </div>
</div>

    <!-- Категории -->
    <div class="catalogue__categories">
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="catalogue__cat-btn"
        :class="{ active: activeCategory === cat.id }"
        @click="activeCategory = cat.id"
      >
        <span class="catalogue__cat-icon" v-html="cat.icon" />
        {{ cat.name }}
      </button>
    </div>

    <!-- Заголовок секции + фильтр -->
    <div class="catalogue__section-header">
      <h2 class="catalogue__section-title">{{ activeCategoryName }}</h2>
      <button class="catalogue__filter">
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.75 12L3.75 12" stroke="#111D33" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.25 12L15.75 12" stroke="#111D33" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.25 18.75L3.75 18.75" stroke="#111D33" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.25 18.75L8.25 18.75" stroke="#111D33" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.25 21L8.25 16.5" stroke="#111D33" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.25 5.25L3.75 5.25" stroke="#111D33" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.25 5.25L11.25 5.25" stroke="#111D33" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.25 3L11.25 7.5" stroke="#111D33" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.75 14.25L15.75 9.75" stroke="#111D33" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      </button>
    </div>

    <!-- Карточки товаров -->
    <div class="catalogue__grid">
      <div
        v-for="product in products"
        :key="product.id"
        class="catalogue__card"
      >
        <!-- Бейджи -->
        <div class="catalogue__card-badges">
          <span v-if="product.discount" class="badge badge--red">-{{ product.discount }}%</span>
          <span v-if="product.timer" class="badge badge--green">{{ product.timer }}</span>
        </div>

        <!-- Лайк -->
        <button class="catalogue__card-like">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="#ccc" stroke-width="1.5"/>
          </svg>
        </button>

        <!-- Фото -->
        <div class="catalogue__card-img">
          <img :src="product.image" :alt="product.name" />
        </div>

        <!-- Инфо -->
        <div class="catalogue__card-info">
          <p class="catalogue__card-name">{{ product.name }}</p>
          <div class="catalogue__card-prices">
            <span class="catalogue__card-price">{{ product.price }} ₸</span>
            <span v-if="product.old_price" class="catalogue__card-old-price">{{ product.old_price }} ₸</span>
          </div>
          <div class="catalogue__card-location">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#888"/>
            </svg>
            <span>{{ product.location }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Nav -->
    <div class="catalogue__nav">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="catalogue__nav-btn"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        <span v-html="tab.icon" />
        <span>{{ tab.name }}</span>
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCatalogueStore } from '../../stores/catalogueStore'

const router = useRouter()
const store = useCatalogueStore()
const { products, categories, stories, loading, error } = storeToRefs(store)

const activeCategory = ref(null)
const activeTab = ref('catalogue')

onMounted(async () => {
  await store.fetchCategories()
  await store.fetchStories()
  if (categories.value.length > 0) {
    activeCategory.value = categories.value[0].id
    await store.fetchProducts(activeCategory.value)
  }
})

watch(activeCategory, (newCat) => {
  if (newCat) store.fetchProducts(newCat)
})

const activeCategoryName = computed(() => {
  return categories.value.find(c => c.id === activeCategory.value)?.name || ''
})

const openStory = (i) => router.push(`/stories?index=${i}`)

const tabs = [
  {
    id: 'catalogue',
    name: 'Каталог',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M4.5 13.0859V20.2494H19.5V13.0859" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.0625 3.75H18.9375C19.1004 3.75003 19.2589 3.80311 19.389 3.90122C19.519 3.99932 19.6136 4.13711 19.6584 4.29375L21 9H3L4.34438 4.29375C4.38904 4.13757 4.48321 4.00012 4.61272 3.90206C4.74222 3.804 4.90006 3.75064 5.0625 3.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 9V10.5C9 11.2956 8.68393 12.0587 8.12132 12.6213C7.55871 13.1839 6.79565 13.5 6 13.5C5.20435 13.5 4.44129 13.1839 3.87868 12.6213C3.31607 12.0587 3 11.2956 3 10.5V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 9V10.5C15 11.2956 14.6839 12.0587 14.1213 12.6213C13.5587 13.1839 12.7956 13.5 12 13.5C11.2044 13.5 10.4413 13.1839 9.87868 12.6213C9.31607 12.0587 9 11.2956 9 10.5V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21 9V10.5C21 11.2956 20.6839 12.0587 20.1213 12.6213C19.5587 13.1839 18.7956 13.5 18 13.5C17.2044 13.5 16.4413 13.1839 15.8787 12.6213C15.3161 12.0587 15 11.2956 15 10.5V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
  },
  {
    id: 'favorites',
    name: 'Избранные',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`
  },
  {
    id: 'funds',
    name: 'Фонды',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M20.25 6H3.75C3.33579 6 3 6.33579 3 6.75V18.75C3 19.1642 3.33579 19.5 3.75 19.5H20.25C20.6642 19.5 21 19.1642 21 18.75V6.75C21 6.33579 20.6642 6 20.25 6Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.75 6V4.5C15.75 4.10218 15.592 3.72064 15.3107 3.43934C15.0294 3.15804 14.6478 3 14.25 3H9.75C9.35218 3 8.97064 3.15804 8.68934 3.43934C8.40804 3.72064 8.25 4.10218 8.25 4.5V6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21 11.0918C18.2649 12.6743 15.1599 13.5052 12 13.5002C8.84021 13.5053 5.73527 12.6747 3 11.0927" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 10.5H13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
  },
  {
    id: 'purchases',
    name: 'Покупки',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M20.25 4.5H3.75C3.33579 4.5 3 4.83579 3 5.25V18.75C3 19.1642 3.33579 19.5 3.75 19.5H20.25C20.6642 19.5 21 19.1642 21 18.75V5.25C21 4.83579 20.6642 4.5 20.25 4.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.75 8.25C15.75 9.24456 15.3549 10.1984 14.6517 10.9017C13.9484 11.6049 12.9946 12 12 12C11.0054 12 10.0516 11.6049 9.34835 10.9017C8.64509 10.1984 8.25 9.24456 8.25 8.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
  },
  {
    id: 'profile',
    name: 'Профиль',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 15C14.0711 15 15.75 13.3211 15.75 11.25C15.75 9.17893 14.0711 7.5 12 7.5C9.92893 7.5 8.25 9.17893 8.25 11.25C8.25 13.3211 9.92893 15 12 15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.98438 18.6904C6.54867 17.5789 7.40971 16.6454 8.47207 15.9933C9.53443 15.3413 10.7566 14.9961 12.0031 14.9961C13.2496 14.9961 14.4718 15.3413 15.5342 15.9933C16.5965 16.6454 17.4576 17.5789 18.0219 18.6904" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
  },
]
</script>

<style scoped>
.catalogue {
  width: 100%;
  min-height: 100vh;
  background: #fff;
  font-family: 'Manrope', sans-serif;
  display: flex;
  flex-direction: column;
  padding-bottom: 70px;
}

.catalogue__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  gap: 15px;
  width: 375px;
  height: 56px;
  margin: 0 auto;
  margin-top: 44px;
  box-sizing: border-box;
}

.catalogue__title {
  flex: 1;
  text-align: center;
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #111D33;
  margin: 0;
}

.catalogue__bell {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Stories */
/* Stories */
.catalogue__stories {
  position: relative;
  width: 100%;
  height: 84px;
  display: flex;
  gap: 8px;
  padding: 0 16px;
  overflow-x: scroll;
  scrollbar-width: none;
  margin-top: 8px;
}

.catalogue__stories::-webkit-scrollbar {
  display: none;
}

/* Story кружок */
.catalogue__story {
  flex-shrink: 0;
  cursor: pointer;
}

.catalogue__story-ring {
  box-sizing: border-box;
  width: 84px;
  height: 84px;
  background: #00C27C;
  border: 1px solid #00C27C;
  border-radius: 100px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.catalogue__story-img {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.catalogue__story-img svg {
  width: 100%;
  height: 100%;
}

/* Categories */
/* Categories */
.catalogue__categories {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  gap: 12px;
  height: 32px;
  margin-left: 16px;
  margin-top: 20px;
  overflow-x: scroll;
  scrollbar-width: none;
  flex-shrink: 0;
}

.catalogue__categories::-webkit-scrollbar {
  display: none;
}

.catalogue__cat-btn {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 8px;
  gap: 8px;
  height: 32px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;  /* ← серый бордер по умолчанию */
  border-radius: 8px;
  flex-shrink: 0;
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #111D33;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

/* При нажатии — только бордер и текст зелёные, фон прозрачный */
.catalogue__cat-btn.active {
  background: transparent;
  border: 1px solid #00C27C;
  color: #00C27C;
}

.catalogue__cat-icon {
  display: flex;
  align-items: center;
  color: inherit;
}

/* Section header */
.catalogue__section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px;
}

.catalogue__section-title {
  font-size: 22px;
  font-weight: 500;
  color: #111D33;
  margin: 0;
  font-family: 'Manrope', sans-serif;
  
}

.catalogue__filter {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

/* Grid */
.catalogue__grid {
  display: grid;
  grid-template-columns: 190px 180px;
  gap: 12px;
  padding: 0 16px;
  margin: 0 auto;
  width: fit-content;
}

/* Card */
.catalogue__card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px;
  gap: 16px;
  width: 177px;
  height: 294px;
  background: #FFFFFF;
  border: 1px solid #F2F2F2;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

/* Фото */
.catalogue__card-img {
  width: 148px;
  height: 164px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.catalogue__card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* Инфо блок */
.catalogue__card-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0;
  width: 148px;
}

/* Название */
.catalogue__card-name {
  font-family: 'Manrope', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #111D33;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 48px;
}

/* Цены */
.catalogue__card-prices {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 8px;
}

.catalogue__card-price {
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #111D33;
}

.catalogue__card-old-price {
  font-family: 'Manrope', sans-serif;
  font-weight: 500;
  font-size: 10px;
  line-height: 10px;
  text-decoration: line-through;
  color: #848484;
}

/* Локация */
.catalogue__card-location {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  line-height: 18px;
  color: #848484;
}

/* Бейджи */
.catalogue__card-badges {
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  gap: 4px;
  z-index: 2;
}

.badge {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  font-family: 'Manrope', sans-serif;
  font-weight: 500;
  font-size: 8px;
  line-height: 8px;
  color: #FFFFFF;
}

.badge--red   { background: #F5463B; }
.badge--green { background: #00C27C; }

/* Лайк */
.catalogue__card-like {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 2;
  padding: 0;
  width: 16px;
  height: 16px;
}
/* Bottom Nav */
.catalogue__nav {
  position: fixed;
  bottom: 34px;
  left: 50%;
  transform: translateX(-50%);
  width: 343px;
  height: 72px;
  background: rgba(255, 255, 255, 0.319);
  box-shadow: 0px 16px 16px -4px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(4px);
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  z-index: 100;
  box-sizing: border-box;
}

.catalogue__nav-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex: 1;
  height: 56px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: 10px;
  line-height: 10px;
  color: #111D33;
  padding: 0;
  transition: color 0.2s;
}

.catalogue__nav-btn.active {
  color: #00C27C;
}

.catalogue__nav-btn svg {
  color: inherit;
}
</style>