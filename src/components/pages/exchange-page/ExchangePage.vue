<template>
    <div>
        <loader-page v-if="loader"></loader-page>
        <div v-else class="exchange">
            <!-- {{ date | date('date')} -->
        <h3 class="title">Exchange on<br>{{ currency.date | date('date') }}</h3>
            <div class="exchange__container">
                <app-card class="exchange__card">EUR: 
                    <input
                    inputmode="numeric"
                    type="text" 
                    v-model="eur" 
                    @focus="exchange('eur')"
                    placeholder="Enter the amount"
                    >
                    <div v-if="this.calcEur" class="exchange__card-badge">
                        <copy-button class="card-badge__copy" :copy="this.eur"></copy-button>
                        <clear-button @click="clearInput('eur')"></clear-button>
                        <span>{{this.calc}}</span>
                    </div>
                </app-card>
                <app-card class="exchange__card">PLN:
                    <input
                    type="text" 
                    v-model="pln"
                    @focus="exchange('pln')"
                    v-on:change="exchangePln()" 
                    placeholder="Enter the amount"
                    >
                    <div v-if="this.calcPln" class="exchange__card-badge">
                        <copy-button class="card-badge__copy" :copy="this.pln"></copy-button>
                        <clear-button @click="clearInput('pln')"></clear-button>
                        <span>{{this.calc}}</span>
                    </div>
                    </app-card>
                <app-card class="exchange__card">USD:
                    <input
                    type="text" 
                    v-model="usd"
                    @focus="exchange('usd')"
                    v-on:change="exchangeUsd()" 
                    placeholder="Enter the amount"
                    >
                    <div v-if="this.calcUsd" class="exchange__card-badge">
                        <copy-button class="card-badge__copy" :copy="this.usd"></copy-button>
                        <clear-button @click="clearInput('usd')"></clear-button>
                        <span>{{this.calc}}</span>
                    </div>
                    </app-card>
                <app-card class="exchange__card">RUB:
                    <input
                    type="text" 
                    @focus="exchange('rub')"
                    v-on:change="exchangeRub()"
                    v-model="rub" 
                    placeholder="Enter the amount"
                    >
                    <div v-if="this.calcRub" class="exchange__card-badge">
                        <copy-button class="card-badge__copy" :copy="this.rub"></copy-button>
                        <clear-button @click="clearInput('rub')"></clear-button>
                        <span>{{this.calc}}</span>
                    </div>
                    </app-card>
            </div>
            <refresh-button 
            @click="refresh()"
            class="exchange__refresh-button"></refresh-button>
        </div>   
    </div>
</template>
<script>
import './ExchangePage.scss'
import AppCard from '../../UI/app-card/AppCard.vue'
import LoaderPage from '../loader-page/LoaderPage.vue'
import RefreshButton from '../../UI/refresh-button/refreshButton.vue'
import messages from '../../../utils/messages'
import CopyButton from '../../UI/copy-button/CopyButton.vue'
import ClearButton from '../../UI/clear-button/ClearButton.vue'
export default {
  components: { AppCard, LoaderPage, RefreshButton, CopyButton, ClearButton },
    data:() =>({
        loader: true,
        currency: null,
        watchLock: '',
        calc:'',
        calcPln:false,
        calcEur:false,
        calcUsd:false,
        calcRub:false,
        eur: 1,
        pln: '4.59',
        usd: '1.14',
        rub: '84.51'
    }),
    async mounted(){
        await this.getCurrency()
        this.loader = false
    },
    methods:{
        async getCurrency(){
            this.currency = await this.$store.dispatch('getCurrency')
        },
        async refresh(){
            this.currency = await this.$store.dispatch('fetchCurrency')
            if (!this.currency.success) {
                this.$popupError(this.currency.error.info)
            } else {
                this.$popupSuccess(messages['succes_exchange'])
            }
        },
        clearInput(name){
            if (name == 'eur') {
                this.eur = ''
            } else if (name == 'pln') {
                this.pln = ''
            } else if (name == 'usd') {
                this.usd =''
            } else if (name == 'rub') {
                this.rub = ''
            }
        },
        exchange(name){
            this.watchLock = name
            this.calc = ''
            if (name == 'eur') {
                this.calcPln = false
                this.calcEur = true
                this.calcUsd = false
                this.calcRub = false
            } else if (name == 'pln') {
                this.calcPln = true
                this.calcEur = false
                this.calcUsd = false
                this.calcRub = false
            } else if (name == 'usd') {
                this.calcPln = false
                this.calcEur = false
                this.calcUsd = true
                this.calcRub = false
            } else if (name == 'rub') {
                this.calcPln = false
                this.calcEur = false
                this.calcUsd = false
                this.calcRub = true
            }
        },
        exchangeEur(){
            this.eur = this.eur.replace(/[^0-9\.\,\+\-\*\/]/g,'');
            for(let i = 0; i < this.eur.length; i++){
                if (this.eur.charAt(i) == "+" || "-" || "*" || "/") {
                    this.calc = eval(this.eur).toFixed(2)
                    this.pln = (this.calc * this.currency.rates.PLN).toFixed(2)
                    this.usd = (this.calc * this.currency.rates.USD).toFixed(2)
                    this.rub = (this.calc * this.currency.rates.RUB).toFixed(2)
                } 
            }
        },
        exchangePln(){
            this.pln = this.pln.replace(/[^0-9\.\,\+\-\*\/]/g,'');
            for(let i = 0; i < this.pln.length; i++){
                console.log(this.pln.charAt(i));
                if (this.pln.charAt(i) == "+" || "-" || "*" || "/") {
                    this.calc = eval(this.pln).toFixed(2)
                    this.eur = +(this.calc / this.currency.rates.PLN).toFixed(2)
                    this.usd = +(this.eur * this.currency.rates.USD).toFixed(2)
                    this.rub = +(this.eur * this.currency.rates.RUB).toFixed(2)
                } 
            }
        },
        exchangeUsd(){
            this.usd = this.usd.replace(/[^0-9\.\,\+\-\*\/]/g,'');
            for(let i = 0; i < this.usd.length; i++){
                if (this.usd.charAt(i) == "+" || "-" || "*" || "/") {
                    this.calc = eval(this.usd).toFixed(2)
                    this.eur = +(this.calc / this.currency.rates.USD).toFixed(2)
                    this.pln = +(this.eur * this.currency.rates.PLN).toFixed(2)
                    this.rub = +(this.eur * this.currency.rates.RUB).toFixed(2)
                } 
            }
        },
        exchangeRub(){
            this.rub = this.rub.replace(/[^0-9\.\,\+\-\*\/]/g,'');
            for(let i = 0; i < this.rub.length; i++){
                if (this.rub.charAt(i) == "+" || "-" || "*" || "/") {
                    this.calc = eval(this.rub).toFixed(2)
                    this.eur = +(this.calc / this.currency.rates.RUB).toFixed(2)
                    this.pln = +(this.eur * this.currency.rates.PLN).toFixed(2)
                    this.usd = +(this.eur * this.currency.rates.USD).toFixed(2)
                } 
            }
        }
    },
    computed:{
        error(){
            return this.$store.getters.error
        },
    },
    watch:{
        error(fbError){
            console.log(fbError.code)
            this.$popupError(fbError.code ||'Something wrong, try again') 
        },
        eur: function(){
            if (this.watchLock == 'eur') {
                try {
                    this.calcPln = false
                    this.calcEur = true
                    this.calcUsd = false
                    this.calcRub = false
                    
                    this.exchangeEur()
                    if (this.eur == '') {
                        this.calcEur = false
                    }
                } catch (e) {}
            }
        },
        pln: function(){
            if (this.watchLock == 'pln') {
                try {
                    this.calcPln = true
                    this.calcEur = false
                    this.calcUsd = false
                    this.calcRub = false
                    this.exchangePln()  
                    if (this.pln == '') {
                        this.calc = ''
                    }
                } catch (e) {}
            }
        },
        usd: function(){
             if (this.watchLock == 'usd') {
                 try {
                    this.calcPln = false
                    this.calcEur = false
                    this.calcUsd = true
                    this.calcRub = false
                    this.exchangeUsd()
                    if (this.usd == '') {
                        this.calc = ''
                    }
                 } catch (e) {}
            }  
        },
        rub: function(){
             if (this.watchLock == 'rub') {
               try {
                    this.calcPln = false
                    this.calcEur = false
                    this.calcUsd = false
                    this.calcRub = true
                    this.exchangeRub()
                    if (this.rub == '') {
                        this.calc = ''
                    }
                } catch (e) {}
            }  
        },
    }
}
</script>