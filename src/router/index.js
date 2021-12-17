import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
        component: () => import('../components/pages/home-page/HomePage.vue'),
      },
      {
        path: '/weather',
        name: 'Main.WeatherPage',
        component: () => import('../components/pages/weather-page/WeatherPage.vue'),
      },
      {
        path: '/exchange',
        name: 'Main.ExchangePage',
        component: () => import('../components/pages/exchange-page/ExchangePage.vue'),
      }

    ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
