import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import axios from 'axios'
import burger from './burger'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    currency:null
  },
  mutations: {
    setError(state, error){
      state.error = error
    },
    clearError(state){
      state.error = null
    },
    setCurrency(state, currency){
      state.currency = currency
    }
  },
  getters:{
    error: s => s.error,
    currency: s => s.currency
  },
  actions: {
    async  fetchCurrency({dispatch,commit}){
      const key = process.env.VUE_APP_FIXER
      const res = await axios.get(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB,BYN`)
      const currency = res.data
      commit('setCurrency', currency)
      // return await res.data
    }
  },
  modules: { 
    auth, info, burger
  }
})
