<template>
    <div>
        <loader-page v-if="loader"></loader-page>
        <div v-else class="home">
            <h3 class="title">Hello {{copyInfo.name}}<br>it is your profile info</h3>
            <div class="user">
                <form class="app-form user-form">
                    <label class="user-form__input">Name:
                        <input 
                        type="text"
                        v-model="copyInfo.name"
                        placeholder="Enter you name..."
                        :disabled="inputDisabled">
                    </label>
                    <label class="user-form__input">
                        Date of birth:
                        <span v-if="inputDisabled">{{copyInfo.dateOfBirth | date('date') }}</span>
                        <input 
                        v-else
                        type="date"
                        :disabled="inputDisabled"
                        v-model="copyInfo.dateOfBirth"
                        >
                    </label>
                    <label class="user-form__input">Gender:
                        <span v-if="inputDisabled">{{copyInfo.gender}}</span>
                        <select 
                        :class="{'main-black' : copyInfo.gender}" 
                        class="gender-select" 
                        name="gender" 
                        v-model="copyInfo.gender"
                        :disabled="inputDisabled"
                        v-else>
                            <option disabled value="">Select your gender</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                        </select>
                    </label>
                    <label class="user-form__input">City: 
                        <input 
                            type="text"
                            :disabled="inputDisabled"
                            placeholder="Enter your city..."
                            v-model="copyInfo.city">
                    </label>
                    <a class="app-link user-form__link" v-if="inputDisabled" @click.prevent="inputDisabled=false">Edit</a>
                    <button class="app-button user-form__button" v-else @click.prevent="uploadData()">Save</button>
                </form>
            </div>
        </div>   
    </div>
</template>
<script>
import AppCard from '../../UI/app-card/AppCard.vue'
import LoaderPage from '../loader-page/LoaderPage.vue'
import {required, minLength} from 'vuelidate/lib/validators'
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
        getInfo(){
            return this.$store.getters.info
        }
    },
    methods:{
        async uploadData(){
            // if(this.$v.$invalid){
            //     this.$v.$touch()
            //     return
            // }
            console.log(this.copyInfo)
            this.inputDisabled = true
            await this.$store.dispatch('updateInfo', this.copyInfo)
            await this.$store.dispatch('fetchInfo')
            this.copyInfo = Object.assign({}, this.getInfo);
        }
    },
    data: () => ({
        loader: true,
        inputDisabled: true,
        copyInfo: null
    }),
    validations:{
        name:{required},
        city:{required},
        gender:{required}
    }
}
</script>