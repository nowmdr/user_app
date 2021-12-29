<template>
    <div>
        <loader-page v-if="loader"></loader-page>
        <div v-else class="exchange">
        <h3 class="title">Exchange on<br>{{this.date | date('date')}}</h3>
            <div class="exchange__container">
                <app-card class="exchange__card">EUR: 
                    <input
                    type="text" 
                    v-model="eur" 
                    @focus="exchange('eur')"
                    placeholder="Enter the amount"
                    ><span v-if="this.calcEur">{{this.calc}}</span>
                    </app-card>
                <app-card class="exchange__card">PLN:
                    <input
                    type="text" 
                    v-model="pln"
                    @focus="exchange('pln')"
                    v-on:change="exchangePln()" 
                    placeholder="Enter the amount"
                    ><span v-if="this.calcPln">{{this.calc}}</span>
                    </app-card>
                <app-card class="exchange__card">USD:
                    <input
                    type="text" 
                    v-model="usd"
                    @focus="exchange('usd')"
                    v-on:change="exchangeUsd()" 
                    placeholder="Enter the amount"
                    ><span v-if="this.calcUsd">{{this.calc}}</span>
                    </app-card>
                <app-card class="exchange__card">RUB:
                    <input
                    type="text" 
                    @focus="exchange('rub')"
                    v-on:change="exchangeRub()"
                    v-model="rub" 
                    placeholder="Enter the amount"
                    ><span v-if="this.calcRub">{{this.calc}}</span>
                    </app-card>
            </div>
            <!-- <div>
                <copy-button></copy-button>
            </div> -->
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
export default {
  components: { AppCard, LoaderPage, RefreshButton, CopyButton },
    data:() =>({
        loader: true,
        currency: null,
        watchLock: '',
        calc:'',
        date: '',
        calcPln:false,
        calcEur:false,
        calcUsd:false,
        calcRub:false,
        eur: '',
        pln: '',
        usd: '',
        rub: ''
    }),
    async mounted(){
        if (this.getBackupCurrency) {
            this.currency = this.getBackupCurrency
            this.date = this.currency.date
            // this.exchangeEur()
            console.log("backup")
        } else {
            this.date = new Date()
            if (!this.pln) {
                this.$message('Please refresh exchange data')
            }
        }
        this.loader = false
    },
    methods:{
        async refresh(){
            await this.$store.dispatch('fetchCurrency')
            this.currency = Object.assign({}, this.getCurrency);
            this.date = this.currency.date
            console.log(this.currency)
            if (!this.currency.success) {
              this.$error(this.currency.error.info)
            } else {
                // this.exchangeEur()
                this.$message(messages['succes_exchange'])
            }
        },
        exchange(name){
            this.watchLock = name
            this.calc = ''
        },
        exchangeEur(){
            this.eur = this.eur.replace(/[^0-9\.\,\+\-\*\/]/g,'');
            for(let i = 0; i < this.eur.length; i++){
                console.log(this.eur.charAt(i));
                if (this.eur.charAt(i) == "+" || "-" || "*" || "/") {
                    this.calc = eval(this.eur)
                    console.log(this.calc)
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
                    this.calc = eval(this.pln)
                    console.log(this.calc)
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
                    this.calc = eval(this.usd)
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
                    this.calc = eval(this.rub)
                    this.eur = +(this.calc / this.currency.rates.RUB).toFixed(2)
                    this.pln = +(this.eur * this.currency.rates.PLN).toFixed(2)
                    this.usd = +(this.eur * this.currency.rates.USD).toFixed(2)
                } 
            }
        }
    },
    computed:{
        getCurrency(){
            return this.$store.getters.currency
        },
        error(){
            return this.$store.getters.error
        },
        getBackupCurrency(){
            return this.$store.getters.backupCurrency
        }
    },
    watch:{
        error(){
            console.log(this.error)
            this.$error(this.error) 
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
                        this.calc = ''
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