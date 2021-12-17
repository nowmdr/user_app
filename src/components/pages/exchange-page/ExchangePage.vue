<template>
    <div class="exchange">
        <h3>Exchange</h3>
        <ul>1 EUR exchange:
            <li>{{currency.rates.BYN}} Belarus ruble</li>
            <li>{{currency.rates.USD}} USA Dollar</li>
            <li>{{currency.rates.RUB}} Russian ruble</li>
        </ul>
    </div>   
</template>
<script>
export default {
    data:() => ({
        currency: null
    }),
    async mounted(){
        this.currency = await this.$store.dispatch('fetchCurrency')
        console.log(this.currency)
    }
}
</script>