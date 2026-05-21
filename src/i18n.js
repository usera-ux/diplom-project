import { createI18n } from 'vue-i18n'

const messages = {
  ru: {
    catalogue: 'Каталог',
    favorites: 'Избранные',
    funds: 'Фонды',
    purchases: 'Покупки',
    profile: 'Профиль',
    category: 'Категория',
    brand: 'Бренд',
    available: 'Доступно в',
    reserve: 'Зарезервировать',
    cancel: 'Отменить резерв',
    notFound: 'Ничего не найдено',
  },
  en: {
    catalogue: 'Catalogue',
    favorites: 'Favorites',
    funds: 'Funds',
    purchases: 'Purchases',
    profile: 'Profile',
    category: 'Category',
    brand: 'Brand',
    available: 'Available at',
    reserve: 'Reserve',
    cancel: 'Cancel reservation',
    notFound: 'Nothing found',
  }
}

export const i18n = createI18n({
  locale: localStorage.getItem('lang') || 'ru',
  fallbackLocale: 'ru',
  messages,
})