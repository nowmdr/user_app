<template>
    <div>
        <loader-page v-if="loader"></loader-page>
        <div v-else class="home">
            <h3 class="title" v-if="name">Hello {{ name }} it is your profile info</h3>
            <div class="user-data">
                <app-card class="user-data__card">
                    <ul class="user-data__list">
                        <li v-if="name" class="user-data__item"><span>Your name is:</span>  {{name}}</li>
                        <li class="user-data__item"><span>Date of birth:</span>  {{dateOfBirth}}</li>
                        <li class="user-data__item"><span>Current city is:</span> {{city}}</li>
                    </ul>
                </app-card>
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
        this.loader = false
    }, 
    computed:{
        name(){
            return this.$store.getters.info.name
        },
        dateOfBirth(){
            return this.$store.getters.info.dateOfBirth
        }, 
        city(){
            return this.$store.getters.info.city
        },
        getInfo(){
            return this.$store.getters.info
        }
    },
    data: () => ({
        loader: true
    })
}
</script>