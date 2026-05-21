<template>
  <div class="faq">
    <!-- Header -->
    <div class="faq__header">
      <button class="faq__back" @click="router.back()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 19L8 12L15 5" stroke="#111D33" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <span class="faq__header-title">FAQ</span>
      <div style="width:24px"/>
    </div>

    <div class="faq__body">
      <h1 class="faq__title">Часто задаваемые вопросы</h1>

      <div class="faq__list">
        <div
          v-for="(item, index) in faqs"
          :key="index"
          class="faq__item"
          :class="{ 'faq__item--open': openIndex === index }"
        >
          <button class="faq__question" @click="toggle(index)">
            <span>{{ item.question }}</span>
            <svg
              class="faq__chevron"
              :class="{ 'faq__chevron--up': openIndex === index }"
              width="20" height="20" viewBox="0 0 20 20" fill="none"
            >
              <path d="M5 7.5L10 12.5L15 7.5" stroke="#111D33" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <transition name="expand">
            <div v-if="openIndex === index" class="faq__answer">
              <div class="faq__answer-inner" v-html="item.answer" />
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const openIndex = ref(0)

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}

const faqs = [
  {
    question: 'Как это работает?',
    answer: `
      <p><strong>Good2Best</strong> — это удобная платформа для осознанной сдачи и покупки вещей, где каждая вещь может стать реальной помощью.</p>
      <p><strong>Сдайте вещь — помогите другим</strong><br>
      У вас есть техника или одежда, которой вы больше не пользуетесь?<br>
      Сдайте её:<br>
      – в пункт приёма<br>
      – через онлайн-форму<br>
      – вызовите курьера на дом</p>
    `
  },
  {
    question: 'Что мы принимаем?',
    answer: `<p>Мы принимаем одежду, обувь, аксессуары, книги, игрушки и бытовую технику в хорошем состоянии.</p>`
  },
  {
    question: 'Что происходит дальше?',
    answer: `<p>После приёма вещи проходят сортировку, оценку и подготовку к продаже или передаче нуждающимся.</p>`
  },
  {
    question: 'Как мы продаём?',
    answer: `<p>Вещи продаются через наш онлайн-магазин и партнёрские площадки по доступным ценам.</p>`
  },
  {
    question: 'Куда идут деньги?',
    answer: `<p>Средства от продажи направляются на поддержку благотворительных программ и развитие платформы.</p>`
  },
  {
    question: 'Отслеживание и отчёты',
    answer: `<p>В личном кабинете вы можете отслеживать статус сданных вещей и получать отчёты о том, как они помогли.</p>`
  },
  {
    question: 'Обязательно ли регистрироваться?',
    answer: `<p>Регистрация не обязательна для сдачи вещей через пункт приёма, но необходима для онлайн-заявок и отслеживания.</p>`
  },
  {
    question: 'Почему это важно?',
    answer: `<p>Осознанное потребление помогает снизить количество отходов и поддержать тех, кто нуждается в помощи.</p>`
  }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&display=swap');

* { box-sizing: border-box; }

.faq {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
  font-family: 'Manrope', sans-serif;
}

/* ── Header ── */
.faq__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 52px 20px 16px;
}

.faq__back {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
}

.faq__header-title {
  font-weight: 700;
  font-size: 17px;
  color: #111D33;
}

/* ── Body ── */
.faq__body {
  flex: 1;
  padding: 8px 16px 40px;
}

.faq__title {
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;
  color: #111D33;
  margin: 0 0 20px;
}

/* ── Accordion list ── */
.faq__list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #E8ECF0;
}

.faq__item {
  border-bottom: 1px solid #E8ECF0;
  background: #fff;
}

.faq__item:last-child {
  border-bottom: none;
}

/* ── Question button ── */
.faq__question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 16px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: #111D33;
  gap: 12px;
}

.faq__question span {
  flex: 1;
}

/* ── Chevron ── */
.faq__chevron {
  flex-shrink: 0;
  transition: transform 0.25s ease;
}

.faq__chevron--up {
  transform: rotate(180deg);
}

/* ── Answer ── */
.faq__answer {
  overflow: hidden;
}

.faq__answer-inner {
  padding: 0 16px 18px;
  font-size: 14px;
  line-height: 20px;
  color: #111D33;
}

.faq__answer-inner :deep(p) {
  margin: 0 0 12px;
}

.faq__answer-inner :deep(p:last-child) {
  margin-bottom: 0;
}

.faq__answer-inner :deep(strong) {
  font-weight: 700;
}

/* ── Expand transition ── */
.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.3s ease, opacity 0.25s ease;
  max-height: 400px;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>