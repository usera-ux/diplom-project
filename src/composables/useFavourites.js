import { ref } from 'vue'

const favourites = ref(JSON.parse(localStorage.getItem('favorites') || '[]'))

export function useFavourites() {
  const isWishlisted = (productId) =>
    favourites.value.some(p => String(p.id) === String(productId))

  const toggleFavourite = (product) => {
    const idx = favourites.value.findIndex(p => String(p.id) === String(product.id))
    if (idx === -1) {
      favourites.value.push(product)
    } else {
      favourites.value.splice(idx, 1)
    }
    localStorage.setItem('favorites', JSON.stringify(favourites.value))
  }

  return { favourites, isWishlisted, toggleFavourite }
}