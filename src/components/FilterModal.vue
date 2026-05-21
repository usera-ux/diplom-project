<template>
  <div class="filter-overlay" @click.self="$emit('close')">
    <div class="filter-modal">

      <div class="filter-modal__handle" />

      <!-- Заголовок + Сбросить -->
      <div class="filter-modal__header">
  <h2 class="filter-modal__title">Фильтр</h2>
  <button
    v-if="hasFilter"
    class="filter-modal__reset"
    @click="resetFilter"
  >Сбросить</button>
</div>

      <!-- Поиск -->
      <div class="filter-modal__group">
        <label class="filter-modal__label">Поиск по названию</label>
        <input
          v-model="localFilter.search"
          class="filter-modal__input"
          placeholder="Введите название"
        />
      </div>

      <!-- Мин/Макс цена -->
      <div class="filter-modal__row">
        <div class="filter-modal__group filter-modal__group--half">
          <label class="filter-modal__label">Мин. стоимость</label>
          <input
            v-model="localFilter.minPrice"
            class="filter-modal__input"
            type="number"
            placeholder="0 ₸"
          />
        </div>
        <div class="filter-modal__group filter-modal__group--half">
          <label class="filter-modal__label">Макс. стоимость</label>
          <input
            v-model="localFilter.maxPrice"
            class="filter-modal__input"
            type="number"
            placeholder="1 000 000 ₸"
          />
        </div>
      </div>

      <!-- Тоггл — только скидочные -->
      <div class="filter-modal__toggle-row">
        <span>Только скидочные товары</span>
        <div
          class="filter-modal__toggle"
          :class="{ active: localFilter.onlyDiscount }"
          @click="localFilter.onlyDiscount = !localFilter.onlyDiscount"
        >
          <div class="filter-modal__toggle-thumb" />
        </div>
      </div>

      <!-- Тоггл — только доступные -->
      <div class="filter-modal__toggle-row">
        <span>Только доступные товары</span>
        <div
          class="filter-modal__toggle"
          :class="{ active: localFilter.onlyAvailable }"
          @click="localFilter.onlyAvailable = !localFilter.onlyAvailable"
        >
          <div class="filter-modal__toggle-thumb" />
        </div>
      </div>

      <!-- Сортировка -->
      <h3 class="filter-modal__sort-title">Сортировать</h3>

      <div
        class="filter-modal__sort-option"
        @click="localFilter.sort = 'asc'"
      >
        <span>по возрастанию цены</span>
        <svg v-if="localFilter.sort === 'asc'" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M5 13l4 4L19 7" stroke="#00C27C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <div
        class="filter-modal__sort-option"
        @click="localFilter.sort = 'desc'"
      >
        <span>по убыванию цены</span>
        <svg v-if="localFilter.sort === 'desc'" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M5 13l4 4L19 7" stroke="#00C27C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <!-- Кнопка -->
      <button 
  class="filter-modal__btn" 
  :class="{ active: hasFilter }"
  @click="apply">Применить
      </button>

    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

const emit = defineEmits(['close', 'apply'])

const localFilter = reactive({
  search: '',
  minPrice: '',
  maxPrice: '',
  onlyDiscount: false,
  onlyAvailable: false,
  sort: '',
})

function resetFilter() {
  localFilter.search = ''
  localFilter.minPrice = ''
  localFilter.maxPrice = ''
  localFilter.onlyDiscount = false
  localFilter.onlyAvailable = false
  localFilter.sort = ''
}


const hasFilter = computed(() => {
  return localFilter.search ||
    localFilter.minPrice ||
    localFilter.maxPrice ||
    localFilter.onlyDiscount ||
    localFilter.onlyAvailable ||
    localFilter.sort
})

function apply() {
  emit('apply', { ...localFilter })
  emit('close')
}

</script>

<style scoped>
.filter-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 200;
  display: flex;
  align-items: flex-end;
}

.filter-modal {
  width: 100%;
  background: #fff;
  border-radius: 24px 24px 0 0;
  padding: 12px 16px 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: 'Manrope', sans-serif;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}

.filter-modal__handle {
  width: 40px;
  height: 4px;
  background: #E2E8F0;
  border-radius: 2px;
  margin: 0 auto 4px;
}

/* Заголовок */
.filter-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.filter-modal__title {
  font-size: 20px;
  font-weight: 700;
  color: #111D33;
  margin: 0;
}

.filter-modal__reset {
  background: none;
  border: none;
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #00C27C;
  cursor: pointer;
  padding: 0;
}

/* Инпуты */
.filter-modal__label {
  font-size: 13px;
  color: #888;
  margin-bottom: 6px;
  display: block;
}

.filter-modal__input {
  width: 100%;
  height: 48px;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 0 14px;
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  color: #111D33;
  box-sizing: border-box;
  outline: none;
}

.filter-modal__input:focus {
  border-color: #00C27C;
}

.filter-modal__row {
  display: flex;
  gap: 12px;
}

.filter-modal__group--half {
  flex: 1;
}

/* Тогглы */
.filter-modal__toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid #F0F0F0;
  font-size: 14px;
  color: #111D33;
}

.filter-modal__toggle {
  width: 48px;
  height: 28px;
  background: #E2E8F0;
  border-radius: 100px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
}

.filter-modal__toggle.active {
  background: #00C27C;
}

.filter-modal__toggle-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  background: #fff;
  border-radius: 50%;
  transition: left 0.2s;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
}

.filter-modal__toggle.active .filter-modal__toggle-thumb {
  left: 23px;
}

/* Сортировка */
.filter-modal__sort-title {
  font-size: 18px;
  font-weight: 700;
  color: #111D33;
  margin: 0;
}

.filter-modal__sort-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid #F0F0F0;
  font-size: 14px;
  color: #111D33;
  cursor: pointer;
}

.filter-modal__btn {
  width: 100%;
  height: 56px;
  background: #F2F2F2;
  color: #888;
  border: none;
  border-radius: 16px;
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: all 0.2s;
}

.filter-modal__btn.active {
  background: #00C27C;
  color: #fff;
  box-shadow: 0px 8px 24px rgba(0, 194, 124, 0.32);
}
</style>