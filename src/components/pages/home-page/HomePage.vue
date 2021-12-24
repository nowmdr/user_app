<template>
    <div>
        <loader-page v-if="loader"></loader-page>
        <div v-else class="home">
            <h3 class="title">Hello {{copyInfo.name}} it is your profile info</h3>
            <div class="user-data">
                <app-card class="user-data__card">
                    <ul class="user-data__list">
                        <li class="user-data__item"><span>Your name is: </span>{{copyInfo.name}} </li>
                        <li class="user-data__item"><span>Date of birth:</span> {{copyInfo.dateOfBirth | date('date') }}</li>
                        <li class="user-data__item"><span>Current city is:</span> </li>
                    </ul>
                </app-card>
                <form class="app-form home-form">
                    <label class="home-form__input">Name:
                        <input 
                        type="text"
                        v-model="copyInfo.name"
                        placeholder="Enter you name..."
                        :disabled="inputDisabled">
                    </label>
                    <div>
                        Date of birth:
                        <span v-if="inputDisabled">{{copyInfo.dateOfBirth | date('date') }}</span>
                        <input 
                        v-else
                        type="date"
                        :disabled="inputDisabled"
                        v-model="copyInfo.dateOfBirth"
                        >
                    </div>
                    <div>City<input 
                    type="text"
                    :disabled="inputDisabled"
                    v-model="copyInfo.city"
                    ></div>
                    <button v-if="inputDisabled" @click.prevent="inputDisabled=false">Edit</button>
                    <button v-else @click.prevent="uploadData()">Save</button>
                </form>
            </div>
        </div>   
    </div>
</template>
<script>
import AppCard from '../../UI/app-card/AppCard.vue'
import LoaderPage from '../loader-page/LoaderPage.vue'
import './HomePage.scss'
export default {
  components: { AppCard, LoaderPage },
    async mounted() {
        if (!Object.keys(this.$store.getters.info).length) {
            await this.$store.dispatch('fetchInfo')
        }
        console.log(this.getInfo)
        console.log(this.copyInfo)
        this.copyInfo = Object.assign({}, this.getInfo);
        console.log(this.copyInfo)
        this.loader = false
    }, 
    computed:{
        // name(){
        //     return this.$store.getters.info.name
        // },
        // dateOfBirth(){
        //     return this.$store.getters.info.dateOfBirth
        // }, 
        // city(){
        //     return this.$store.getters.info.city
        // },
        getInfo(){
            return this.$store.getters.info
        }
    },
    methods:{
        async uploadData(){
            console.log(this.copyInfo)
            this.inputDisabled = true
            await this.$store.dispatch('updateInfo', this.copyInfo)
            await this.$store.dispatch('fetchInfo')
            this.copyInfo = Object.assign({}, this.getInfo);
        }
    },
    data: () => ({
        loader: true,
        some: 'kek',
        inputDisabled: true,
        copyInfo: null
    })
}
</script>