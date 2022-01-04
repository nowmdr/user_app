<template>
    <div>
        <loader-page v-if="loader"></loader-page>
        <div v-else class="home">
            <!-- <app-popup :messages="messages" ></app-popup> -->
            <app-modal :show.sync="modalVisible">
                <post-form></post-form>
            </app-modal>
            <h3 class="title"> <span>Hello {{name}}</span><br>it is your profile info</h3>
            <div class="user">
                <app-card>
                    <form class="user-form">
                    <label class="user-form__input">Name:
                        <input 
                        type="text"
                        v-model="name"
                        placeholder="Enter you name..."
                        :disabled="inputDisabled"><br>
                        <span class="error-text"
                        v-if="$v.name.$dirty && !$v.name.required"
                        >Name field is empty</span>
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
                        <span v-if="inputDisabled">{{gender}}</span>
                        <select 
                        :class="{'main-black' : copyInfo.gender}" 
                        class="gender-select" 
                        name="gender" 
                        v-model="gender"
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
                            v-model="city"><br>
                            <span
                            class="error-text"
                            v-if="$v.city.$dirty && !$v.city.required"
                            >City field is empty</span>
                    </label>
                    <a class="app-link user-form__link" v-if="inputDisabled" @click.prevent="inputDisabled=false">Edit data</a>
                    <button class="app-button user-form__button" v-else @click.prevent="uploadData()">Save</button>
                    <div class="user-form__post-button">
                        <add-post-button class="post-button" @click="modalOpen()"></add-post-button>
                    </div>
                </form>
                </app-card>
            </div>
        </div>   
    </div>
</template>
<script>
import AppCard from '../../UI/app-card/AppCard.vue'
import LoaderPage from '../loader-page/LoaderPage.vue'
import {required, minLength} from 'vuelidate/lib/validators'
import './HomePage.scss'
import AddPostButton from '../../UI/add-post-button/AddPostButton.vue'
import AppModal from '../../UI/app-modal/AppModal.vue'
import PostForm from '../post-components/post-form/PostForm.vue'
import AppPopup from '../../UI/app-popup/AppPopup.vue'
export default {
  components: { AppCard, LoaderPage, AddPostButton, AppModal, PostForm, AppPopup },
  data: () => ({
        messages: [
            {name: 'notification name', id: Date.now().toLocaleString()}
        ],
        loader: true,
        inputDisabled: true,
        modalVisible: false,
        copyInfo: null,
        name: "",
        city: "",
        gender: ""
    }),
    validations:{
        name:{required},
        city:{required},
        gender:{required}
    },
    async mounted() {
        if (!Object.keys(this.$store.getters.info).length) {
            await this.$store.dispatch('fetchInfo')
        }
        console.log(this.getInfo)
        console.log(this.copyInfo)
        this.copyInfo = Object.assign({}, this.getInfo);
        console.log(this.copyInfo)
        this.loader = false
        console.log(this.name)
        this.copyInfo1()
    }, 
    computed:{
        getInfo(){
            return this.$store.getters.info
        }
    },
    methods:{
        modalOpen(){
            this.modalVisible = true
        },
        copyInfo1(){
            this.name = this.copyInfo.name
            this.city = this.copyInfo.city
            this.gender = this.copyInfo.gender
            console.log(this.name)
            console.log(this.city)
            console.log(this.gender)
        },
        async uploadData(){
            if(this.$v.$invalid){
                this.$v.$touch()
                return
            }
            const formData = {
                name: this.name,
                dateOfBirth: this.copyInfo.dateOfBirth,
                city: this.city,
                gender: this.gender
            }
            console.log(this.copyInfo)
            this.inputDisabled = true
            await this.$store.dispatch('updateInfo', formData)
            await this.$store.dispatch('fetchInfo')
            this.copyInfo = Object.assign({}, this.getInfo);
        }
    }
}
</script>