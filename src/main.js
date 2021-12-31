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
  apiKey: "AIzaSyDjvPcStPAq9AIlQPHyfnpL46qhAwqZFt4",
  authDomain: "user-app-testing.firebaseapp.com",
  projectId: "user-app-testing",
  storageBucket: "user-app-testing.appspot.com",
  messagingSenderId: "978862273072",
  appId: "1:978862273072:web:7bf2b0d4195017d44e33f5",
  measurementId: "G-TDR6GKBJNB"
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

