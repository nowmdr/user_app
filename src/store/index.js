import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import axios from 'axios'
import burger from './burger'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
    // isNavOpen: false

  },
  mutations: {
    setError(state, error){
      state.error = error
    },
    clearError(state){
      state.error = null
    },
  //   toggleNav() {
  //     state.isNavOpen = !state.isNavOpen
  // }
  },
  getters:{
    error: s => s.error
  },
  actions: {
    async  fetchCurrency(){
      const key = process.env.VUE_APP_FIXER
      const res = await axios.get(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB,BYN`)
      return await res.data
    }
  },
  modules: { 
    auth, info, burger
  }
})
