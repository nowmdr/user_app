<template>
    <div class="home">
        <h3 v-if="name">Hello {{ name }} it is your profile info</h3>
        <div class="user-data">
            <ul class="user-data__list">
                <li v-if="name" class="user-data__item">Your name is: {{name}}</li>
                <li class="user-data__item">Date of birth: {{dateOfBirth}}</li>
                <li class="user-data__item">Phone:</li>
                <li class="user-data__item">Address:</li>
                <li class="user-data__item">About me:</li>
            </ul>
            <!-- <button class="app-button">Change you data</button> -->
            <!-- <form class="app-form" @submit.prevent="submitHandler()">
                <div class="form__input">
            <input 
            type="text"
            class="app-input"
            placeholder="Name..."
            v-model="name"
            :class="{invalid:($v.name.$dirty && !$v.name.required)}"
            >
            <span
            v-if="$v.name.$dirty && !$v.name.required"
            >Name field is empty</span>
          </div>
          <div class="form__input">
              <input 
              type="text"
              class="app-input"
              placeholder="Date of birth..."
              v-model="dateOfBirth"
              :class="{invalid: ($v.dateOfBirth.$dirty && !$v.dateOfBirth.required) || ($v.dateOfBirth.$dirty && !$v.dateOfBirth.minLength)}" 
              >
              <span
              v-if="$v.dateOfBirth.$dirty && !$v.dateOfBirth.required"
              >Date of birth field is empty</span>
              <span
              v-if="$v.dateOfBirth.$dirty && !$v.dateOfBirth.minLength"
              >Date of birth dont be less than 6 symbols, format is - 01.01.1996</span>
          </div>
                <div class="form__input">
                    <input 
                    class="app-input" 
                    type="phone" 
                    placeholder="Phone..." 
                    v-model.trim="phone"
                    >
                </div>
                <div class="form__input">
                    <input 
                    class="app-input" 
                    type="text" 
                    placeholder="Address..." 
                    v-model.trim="address"
                    >
                </div>
                <div class="form__input">
                    <input 
                    class="app-input" 
                    type="text" 
                    placeholder="About..." 
                    v-model.trim="about"
                    >
                </div>
                <button class="app-button" type="submit">Submit</button>
            </form> -->
        </div>
    </div>
</template>
<script>
// import {email, required, minLength} from 'vuelidate/lib/validators'
export default {
    async mounted() {
        if (!Object.keys(this.$store.getters.info).length) {
            await this.$store.dispatch('fetchInfo')
        }
    }, 
    computed:{
        name(){
            return this.$store.getters.info.name
        },
        dateOfBirth(){
            return this.$store.getters.info.dateOfBirth
        }
    },
    data: () => ({
        // name: '',
        // dateOfBirth: ''
        // phone: '',
        // address:'',
        // about: ''

    })

   
}
</script>