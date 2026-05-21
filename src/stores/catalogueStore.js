import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from './../services/supabase'

const iconMap = {
  laptop: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.125 13.75V5.625C3.125 5.29348 3.2567 4.97554 3.49112 4.74112C3.72554 4.5067 4.04348 4.375 4.375 4.375H15.625C15.9565 4.375 16.2745 4.5067 16.5089 4.74112C16.7433 4.97554 16.875 5.29348 16.875 5.625V13.75" stroke="#00C27C" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.875 13.75H18.125V15C18.125 15.3315 17.9933 15.6495 17.7589 15.8839C17.5245 16.1183 17.2065 16.25 16.875 16.25H3.125C2.79348 16.25 2.47554 16.1183 2.24112 15.8839C2.0067 15.6495 1.875 15.3315 1.875 15V13.75Z" stroke="#00C27C" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.25 6.875H8.75" stroke="#00C27C" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  phone: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.75 1.875H6.25C5.55964 1.875 5 2.43464 5 3.125V16.875C5 17.5654 5.55964 18.125 6.25 18.125H13.75C14.4404 18.125 15 17.5654 15 16.875V3.125C15 2.43464 14.4404 1.875 13.75 1.875Z" stroke="#111D33" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 4.375H15" stroke="#111D33" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 15.625H15" stroke="#111D33" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  smart: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.625 16.875V3.125C15.625 2.77982 15.3452 2.5 15 2.5L5 2.5C4.65482 2.5 4.375 2.77982 4.375 3.125V16.875C4.375 17.2202 4.65482 17.5 5 17.5H15C15.3452 17.5 15.625 17.2202 15.625 16.875Z" stroke="#111D33" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  tablet: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.125 13.75V5.625C3.125 5.29348 3.2567 4.97554 3.49112 4.74112C3.72554 4.5067 4.04348 4.375 4.375 4.375H15.625C15.9565 4.375 16.2745 4.5067 16.5089 4.74112C16.7433 4.97554 16.875 5.29348 16.875 5.625V13.75" stroke="#111D33" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
}

export const useCatalogueStore = defineStore('catalogue', () => {
  const products       = ref([])
  const categories     = ref([])
  const stories        = ref([])
  const loading        = ref(false)
  const error          = ref(null)
  const currentProduct = ref(null)
  const purchases      = ref([])

  async function fetchCategories() {
    const { data, error: err } = await supabase
      .from('categories')
      .select('*')
      .order('id')
    if (err) { error.value = err.message; return }
    categories.value = data.map(cat => ({
      ...cat,
      icon: iconMap[cat.icon] ?? cat.icon,
    }))
  }

  async function fetchStories() {
    const { data, error: err } = await supabase
      .from('stories')
      .select('*')
      .order('id')
    if (err) { error.value = err.message; return }
    stories.value = data.map(story => ({
      ...story,
      svg: `<img src="${story.image}" alt="${story.title}" style="width:100%;height:100%;object-fit:cover;border-radius:50%" />`,
    }))
  }

  async function fetchProducts() {
    const { data, error: err } = await supabase
      .from('products')
      .select('*')
      .order('id')
    if (err) { error.value = err.message; return }
    products.value = data
  }

  async function fetchProduct(id) {
    loading.value = true
    error.value = null

    const found = products.value.find(p => String(p.id) === String(id))
    if (found) {
      currentProduct.value = found
      loading.value = false
      return
    }

    const { data, error: err } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (err) {
      error.value = err.message
      currentProduct.value = null
    } else {
      currentProduct.value = data
    }

    loading.value = false
  }

  async function fetchAll() {
    loading.value = true
    error.value = null
    await Promise.all([fetchCategories(), fetchStories(), fetchProducts()])
    loading.value = false
  }

  async function fetchPurchases() {
    loading.value = true
    error.value = null

    const { data, error: err } = await supabase
      .from('purchases')
      .select(`
        *,
        products (
          id,
          name,
          price,
          image,
          location
        )
      `)
      .order('created_at', { ascending: false })

    if (err) { error.value = err.message }
    else { purchases.value = data }

    loading.value = false
  }

  return {
    products,
    categories,
    stories,
    loading,
    error,
    currentProduct,
    purchases,
    fetchCategories,
    fetchStories,
    fetchProducts,
    fetchProduct,
    fetchAll,
    fetchPurchases,
  }
})