import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/compat/app'


Vue.use(VueRouter)

const routes = [
  {
    path: '/', 
    // redirect: '/home',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children:[
      {
        path: '/login',
        name: 'Main.LoginPage',
        component: () => import('../components/pages/login-page/LoginPage.vue'),
      },
      {
        path: '/register',
        name: 'Main.RegisterPage',
        component: () => import('../components/pages/register-page/RegisterPage.vue'),
      },
      {
        path: '/home',
        name: 'Main.HomePage',
        meta: {auth: true},
        component: () => import('../components/pages/home-page/HomePage.vue'),
      },
      {
        path: '/weather',
        name: 'Main.WeatherPage',
        meta: {auth: true},
        component: () => import('../components/pages/weather-page/WeatherPage.vue'),
      },
      {
        path: '/exchange',
        name: 'Main.ExchangePage',
        meta: {auth: true},
        component: () => import('../components/pages/exchange-page/ExchangePage.vue'),
      },
      { // *404 page
        path: '/*',
        name: 'main.404',
        component: () => import('@/components/pages/404-page/404.vue'),
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)
  if (requireAuth && !currentUser) {
    next('/login?message=login ')
  } else {
    next()
  }
})

export default router
