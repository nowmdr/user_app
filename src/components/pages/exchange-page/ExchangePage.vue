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
                    v-on:change="exchangeEur()"
                    placeholder="Enter the amount"
                    >
                    </app-card>
                <app-card class="exchange__card">BYN
                    <input
                    type="number" 
                    v-model="byn"
                    v-on:change="exchangeByn()" 
                    placeholder="Enter the amount"
                    >
                    </app-card>
                <app-card class="exchange__card">USD
                    <input
                    type="number" 
                    v-model="usd"
                    v-on:change="exchangeUsd()" 
                    placeholder="Enter the amount"
                    ></app-card>
                <app-card class="exchange__card">RUB
                    <input
                    type="number" 
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
        // currencyRates: {
        //     eur: 0,
        //     byn: 0,
        //     usd: 0,
        //     rub: 0
        // },
        eur: 100,
        byn: 0,
        usd: 0,
        rub: 0
    }),
    async mounted(){
        await this.$store.dispatch('fetchCurrency')
        this.currency = Object.assign({}, this.getCurrency);
        // this.copyCurrency = Object.assign({}, this.currency)
        // console.log(this.currency.rates.BYN)
        // this.setCurrencyRates()
        this.exchangeEur()
        this.loader = false
    },
    methods:{
        // setCurrencyRates(){
        //     this.currencyRates.eur = this.currency.rates.EUR
        //     this.currencyRates.byn = this.currency.rates.BYN
        //     this.currencyRates.usd = this.currency.rates.USD
        //     this.currencyRates.rub = this.currency.rates.RUB
        //     console.log(this.currencyRates)
        // },
        exchangeEur(){
            this.byn = +(this.eur * this.currency.rates.BYN).toFixed(2)
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
        //    this.byn = +(this.eur * this.currencyRates.byn).toFixed(2) 
        },
        byn: function(){
            // this.eur = +(this.byn * this.currencyRates.eur).toFixed(2)

        }
    }
}
</script>