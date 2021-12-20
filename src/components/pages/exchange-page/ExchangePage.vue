<template>
    <div class="exchange">
        <h3 class="title">Exchange on {{currency.date | date('date')}}</h3>
        <div class="exchange__container">
            <app-card class="exchange__card">EUR 
                <input
                type="text" 
                v-model="eur" 
                placeholder="Enter the amount"
                ></app-card>
            <app-card class="exchange__card">BYN {{ +(eur * currency.rates.BYN).toFixed(2) }}</app-card>
            <app-card class="exchange__card">USD {{+(eur * currency.rates.USD).toFixed(2)}}</app-card>
            <app-card class="exchange__card">RUB {{+(eur * currency.rates.RUB).toFixed(2)}}</app-card>
        </div>
    </div>   
</template>
<script>
import './ExchangePage.scss'
import AppCard from '../../UI/app-card/AppCard.vue'
export default {
  components: { AppCard },
    data:() => ({
        currency: null,
        byn: 0,
        eur: 100
    }),
    async mounted(){
        this.currency = await this.$store.dispatch('fetchCurrency')
        console.log(this.currency)
    },
    methods:{
       
    }

}
</script>