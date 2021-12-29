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
    currency:null,
    backupCurrency: null
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
    },
    setBackupCurrency(state,currency){
      state.backupCurrency = currency
    }
  },
  getters:{
    error: s => s.error,
    currency: s => s.currency,
    backupCurrency: s => s.backupCurrency
  },
  actions: {
    async  fetchCurrency({dispatch,commit}){
      const key = process.env.VUE_APP_FIXER
      const res = await axios.get(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB,PLN`)
      const currency = res.data
      
      if (currency.success) {
        commit('setCurrency', currency)
        commit('setBackupCurrency', currency)
      } else {
        commit('setError', currency.error.info)
        commit('setCurrency', currency)
      }
      
      // return await res.data
    }
  },
  modules: { 
    auth, info, burger
  }
})
