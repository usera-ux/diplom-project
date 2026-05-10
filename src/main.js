import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './styles/main.css'
import SplashView from './views/SplashView.vue'
import OnboardingView from './views/OnboardingView.vue'
import OnboardingView2 from './views/OnboardingView-2.vue'
import OnboardingView3 from './views/OnboardingView-3.vue'
import OnboardingView4 from './views/OnboardingView-4.vue'
import OnboardingView5 from './views/OnboardingView-5.vue'
import Cataloguepage from './views/Catalog/Cataloguepage.vue'
import ProductCard from './components/ProductCard.vue'
import StoriesPage from './views/Catalog/StoriesPage.vue'
import { useCatalogueStore } from './stores/catalogueStore'
import { supabase } from './services/supabase'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: SplashView },
    { path: '/onboarding', component: OnboardingView },
    { path: '/onboarding/2', component: OnboardingView2 },
    { path: '/onboarding/3', component: OnboardingView3 },
    { path: '/onboarding/4', component: OnboardingView4 },
    { path: '/onboarding/5', component: OnboardingView5 },
    { path: '/catalogue', component: Cataloguepage },
    { path: '/product/:id', component: ProductCard },
    { path: '/stories', component: StoriesPage }
  ]
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')