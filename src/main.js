import Vue from 'vue'
import Vuelidate from 'vuelidate'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue'
import router from './router'
import store from './store'
import dataFilter from './filters/date.filter'
import "materialize-css/dist/js/materialize.min.js";
import messagePlugin from './utils/message.plugin'



// Vue.use(BootstrapVue)
// Vue.use(IconsPlugin)

// firebase
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'

Vue.config.productionTip = false
// firebase
const firebaseConfig = {
  apiKey: "AIzaSyDIRA3wf4-Fd4AC9-rIPB74pOm9rGUbDWw",
  authDomain: "user-app-3909c.firebaseapp.com",
  databaseURL: "https://user-app-3909c-default-rtdb.firebaseio.com",
  projectId: "user-app-3909c",
  storageBucket: "user-app-3909c.appspot.com",
  messagingSenderId: "510472655389",
  appId: "1:510472655389:web:d06ab866140e3a0c7dacf4",
  measurementId: "G-T1JT4PDDXL"
};
firebase.initializeApp(firebaseConfig)

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date',  dataFilter) 

let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
      app = new Vue({
        router,
        store,
        render: h => h(App) 
      }).$mount('#app')
  }
  

})

