import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '../views/SplashView.vue'
import OnboardingView from '../views/OnboardingView.vue'
import OnboardingView2 from '../views/OnboardingView-2.vue'
import OnboardingView3 from '../views/OnboardingView-3.vue'
import OnboardingView4 from '../views/OnboardingView-4.vue'
import OnboardingView5 from '../views/OnboardingView-5.vue'
import Cataloguepage from '../views/Catalog/Cataloguepage.vue'

const routes = [
  { path: '/', name: 'splash', component: SplashView },
  { path: '/onboarding', name: 'onboarding', component: OnboardingView},
  { path: '/onboarding/2', name: 'onboarding-2', component: OnboardingView2 },
  { path: '/onboarding/3', name: 'onboarding-3', component: OnboardingView3 },
  { path: '/onboarding/4', name: 'onboarding-4', component: OnboardingView4 },
  { path: '/onboarding/5', name: 'onboarding-5', component: OnboardingView5 },
  { path: '/catalogue', name: 'catalogue', component: Cataloguepage },
  { path: '/product/:id', name: 'product', component: ProductCard }

]

export default createRouter({
  history: createWebHistory(),
  routes
})