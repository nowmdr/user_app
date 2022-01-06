import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import posts from './posts'
import axios from 'axios'
import burger from './burger'
import popup from './popup'
import firebase from 'firebase/compat/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    currency:null,
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
  },
  getters:{
    error: s => s.error,
    currency: s => s.currency,
  },
  actions: {
    async  fetchCurrency({dispatch,commit}){
      const key = process.env.VUE_APP_FIXER
      const res = await axios.get(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB,PLN`)
      // const res = await axios.get(`https://freecurrencyapi.net/api/v2/latest?apikey=b12958a0-696b-11ec-b60b-f973de7f2eab&base=EUR&symbols=USD,EUR,RUB,PLN`)
      
      const currency = res.data
      console.log(currency)
      commit('setCurrency', currency)
      // if (currency.success) {
      //   commit('setCurrency', currency)
      //   commit('setBackupCurrency', currency)
      // } else {
      //   commit('setError', currency.error.info)
      //   commit('setCurrency', currency)
      // }
      
      // return await res.data
    },
    async createCurrency({dispatch, commit}){
    const uid = await dispatch('getUid')
    const currency = await firebase.database().ref(`/users/${uid}/exchange`).set({
      base: "EUR",
      date: "2022-01-03",
      rates:{
          EUR: 1,
          PLN: 4.589025,
          RUB: 84.508938,
          USD: 1.135209,
      },
      success: true,
      timestamp: 1641215943
    })
    },
    async getCurrency({dispatch, commit}){
      try {
        const uid = await dispatch('getUid')
        const currency = (await firebase.database().ref(`/users/${uid}/exchange`).once('value')).val()
        commit('setCurrency', currency)
        console.log(currency)
    } catch (e) {
      commit('setError', e)
    }  
    }
  },
  modules: { 
    auth, info, burger,posts,popup
  }
})
