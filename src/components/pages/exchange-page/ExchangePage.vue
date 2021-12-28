<template>
    <div>
        <loader-page v-if="loader"></loader-page>
        <div v-else class="exchange">
        <h3 class="title">Exchange on<br> {{this.getCurrency.date| date('date')}}</h3>
            <div class="exchange__container">
                <app-card class="exchange__card">EUR 
                    <input
                    type="number" 
                    v-model="eur" 
                    @focus="exchange('eur')"
                    placeholder="Enter the amount"
                    >
                    </app-card>
                <app-card class="exchange__card">BYN
                    <input
                    type="number" 
                    v-model="byn"
                    @focus="exchange('byn')"
                    v-on:change="exchangeByn()" 
                    placeholder="Enter the amount"
                    >
                    </app-card>
                <app-card class="exchange__card">USD
                    <input
                    type="number" 
                    v-model="usd"
                    @focus="exchange('usd')"
                    v-on:change="exchangeUsd()" 
                    placeholder="Enter the amount"
                    ></app-card>
                <app-card class="exchange__card">RUB
                    <input
                    type="number" 
                    @focus="exchange('rub')"
                    v-on:change="exchangeRub()"
                    v-model="rub" 
                    placeholder="Enter the amount"
                    ></app-card>
            </div>
        </div>   
    </div>
</template>
<script>
import './ExchangePage.scss'
import AppCard from '../../UI/app-card/AppCard.vue'
import LoaderPage from '../loader-page/LoaderPage.vue'
export default {
  components: { AppCard, LoaderPage },
    data:() => ({
        loader: true,
        currency: null,
        watchLock: '',
        eur: 100,
        byn: 0,
        usd: 0,
        rub: 0
    }),
    async mounted(){
        await this.$store.dispatch('fetchCurrency')
        this.currency = Object.assign({}, this.getCurrency);
        this.exchangeEur()
        this.loader = false
    },
    methods:{
        exchange(name){
            this.watchLock = name
        },
        exchangeEur(){
            this.byn = (this.eur * this.currency.rates.BYN).toFixed(2)
            this.usd = +(this.eur * this.currency.rates.USD).toFixed(2)
            this.rub = +(this.eur * this.currency.rates.RUB).toFixed(2)
        },
        exchangeByn(){
            this.eur = +(this.byn / this.currency.rates.BYN).toFixed(2)
            this.usd = +(this.eur * this.currency.rates.USD).toFixed(2)
            this.rub = +(this.eur * this.currency.rates.RUB).toFixed(2)
        },
        exchangeUsd(){
            this.eur = +(this.usd / this.currency.rates.USD).toFixed(2)
            this.byn = +(this.eur * this.currency.rates.BYN).toFixed(2)
            this.rub = +(this.eur * this.currency.rates.RUB).toFixed(2)
        },
        exchangeRub(){
            this.eur = +(this.rub / this.currency.rates.RUB).toFixed(2)
            this.byn = +(this.eur * this.currency.rates.BYN).toFixed(2)
            this.usd = +(this.eur * this.currency.rates.USD).toFixed(2)
        }
    },
    computed:{
        getCurrency(){
            return this.$store.getters.currency
        }
    },
    watch:{
        eur: function(){
            if (this.watchLock == 'eur') {
               this.exchangeEur() 
            }
            
        },
        byn: function(){
            if (this.watchLock == 'byn') {
               this.exchangeByn()  
            }
        },
        usd: function(){
             if (this.watchLock == 'usd') {
               this.exchangeUsd()
            }  
        },
        rub: function(){
             if (this.watchLock == 'rub') {
               this.exchangeRub()
            }  
        },
    }
}
</script>