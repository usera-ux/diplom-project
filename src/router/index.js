import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '../views/SplashView.vue'
import OnboardingView from '../views/OnboardingView.vue'
import OnboardingView2 from '../views/OnboardingView-2.vue'
import OnboardingView3 from '../views/OnboardingView-3.vue'
import OnboardingView4 from '../views/OnboardingView-4.vue'
import OnboardingView5 from '../views/OnboardingView-5.vue'
import AuthView from '../views/AuthView.vue'
import OtpView from '../views/OtpView.vue'
import Cataloguepage from '../views/Catalog/Cataloguepage.vue'
import StoriesPage from '../views/Catalog/StoriesPage.vue'
import FilterModal from '../components/FilterModal.vue'
import ProductPage from '../views/Catalog/ProductPage.vue'
import FavoritesView from '../views/FavoritesView.vue'
import PurchasesView from '../views/PurchasesView.vue'
import ConnectionView from '../views/ConnectionView.vue'
import PinSetupView from '../views/PinSetupView.vue'
import BiometricScreen from '../views/BiometricScreen.vue'
import FundsView from '../views/FundsView.vue'
import FundView from '../views/FundView.vue'
import ProfileView from '../views/ProfileView.vue'
import UserInfoView from '../views/UserInfoView.vue'
import PinSuccessView from '../views/PinSuccessView.vue'
import FAQView from '../views/Faq.vue'
import LogoutModal from '../components/LogoutModal.vue'
import ProfileUnauthorized from '../views/ProfileUnauthorized.vue'
import MyHelp from '../views/MyHelp.vue'
import MyHelpDetails from '../views/MyHelpDetails.vue'
import MyHelpProduct from '../views/MyHelpProduct.vue'
import Natification from '../views/Natification.vue'
import Language from '../views/Language.vue'

const publicRoutes = ['splash', 'onboarding', 'onboarding-2', 'onboarding-3', 'onboarding-4', 'onboarding-5', 'auth', 'otp']

const routes = [
  { path: '/',              name: 'splash',       component: SplashView },
  { path: '/onboarding',   name: 'onboarding',   component: OnboardingView },
  { path: '/onboarding/2', name: 'onboarding-2', component: OnboardingView2 },
  { path: '/onboarding/3', name: 'onboarding-3', component: OnboardingView3 },
  { path: '/onboarding/4', name: 'onboarding-4', component: OnboardingView4 },
  { path: '/onboarding/5', name: 'onboarding-5', component: OnboardingView5 },
  { path: '/auth',         name: 'auth',         component: AuthView },
  { path: '/otp',          name: 'otp',          component: OtpView },
  { path: '/catalogue',    name: 'catalogue',    component: Cataloguepage },
  { path: '/stories',      name: 'stories',      component: StoriesPage },
  { path: '/filter',       name: 'filter',       component: FilterModal },
  { path: '/product/:id',  name: 'product',      component: ProductPage },
  { path: '/favorites',    name: 'favorites',    component: FavoritesView },
  { path: '/purchases',    name: 'purchases',    component: PurchasesView },
  { path: '/pin-setup',    name: 'pin-setup',    component: PinSetupView },
  { path: '/connection',   name: 'connection',   component: ConnectionView },
  { path: '/biometric',    name: 'biometric',    component: BiometricScreen },
  { path: '/funds',        name: 'funds',        component: FundsView },
  { path: '/fund/:id',     name: 'fund',         component: FundView },
  { path: '/profile',      name: 'profile',      component: ProfileView },
  { path: '/profile/info', name: 'user-info', component: UserInfoView },
  { path: '/profile/pin-success', name: 'pin-success', component: PinSuccessView },
  { path: '/faq',          name: 'faq',          component: FAQView },
  { path: '/profile/unauthorized', name: 'profile-unauthorized', component: ProfileUnauthorized },
  { path: '/logout',       name: 'logout',       component: LogoutModal },
  { path: '/my-help',      name: 'my-help',      component: MyHelp },
  { path: '/myhelp/details',  name: 'myhelp-details', component: MyHelpDetails },
  { path: '/my-help/product/:id', name: 'myhelp-product', component: MyHelpProduct },
  { path: '/notifications', name: 'notifications', component: Natification },
  { path: '/language',     name: 'language',     component: Language }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  const { useAuthStore } = await import('../stores/authStore')
  const authStore = useAuthStore()

  if (authStore.user === null) {
    await authStore.init()
  }

  const isPublic = publicRoutes.includes(to.name)

  if (!isPublic && !authStore.isLoggedIn) {
    return { name: 'auth' }
  }

  if (authStore.isLoggedIn && (to.name === 'auth' || to.name === 'otp')) {
    return { name: 'catalogue' }
  }
})

export default router