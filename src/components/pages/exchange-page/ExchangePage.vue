<template>
    <div>
        <loader-page v-if="loader"></loader-page>
        <div v-else class="exchange">
        <h3 class="title">Exchange on<br> {{currency.date | date('date') }}</h3>
            <div class="exchange__container">
                <app-card class="exchange__card">EUR 
                    <input
                    type="number" 
                    v-model="eur" 
                    placeholder="Enter the amount"
                    ></app-card>
                <app-card class="exchange__card">BYN {{ +(eur * currency.rates.BYN).toFixed(2) }}</app-card>
                <app-card class="exchange__card">USD {{+(eur * currency.rates.USD).toFixed(2)}}</app-card>
                <app-card class="exchange__card">RUB {{+(eur * currency.rates.RUB).toFixed(2)}}</app-card>
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
        byn: 0,
        eur: 100
    }),
    async mounted(){
        this.currency = await this.$store.dispatch('fetchCurrency')
        console.log(this.currency)
        this.loader = false
    },
}
</script>