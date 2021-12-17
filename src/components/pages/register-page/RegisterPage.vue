<template>
    <div>
        <h3 class="title">Registration</h3>
        <form class="app-form form" @submit.prevent="submitHandler()">
        <div class="form__input">
            <input 
            class="app-input" 
            type="text" 
            placeholder="Email..." 
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
            >
            <span
            v-if="$v.email.$dirty && !$v.email.required"
            >Email is empty</span>
            <span
            v-else-if="$v.email.$dirty && !$v.email.email"
            >Your Email is incorrect</span>
          </div>
          <div class="form__input">
            <input 
            class="app-input" 
            type="password" 
            placeholder="Password..." 
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.email.minLength)}" 
            >
            <span
            v-if="$v.password.$dirty && !$v.password.required"
            >Password is empty</span>
            <span
            v-if="$v.password.$dirty && !$v.password.minLength"
            >Password dont be less than 6 symbols, now is {{password.length}}</span>
          </div>
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
          <button class="app-button" type="submit">Submit</button>
          <router-link style="margin-top:15px" to="/login">If you have account - login</router-link>
          <span>{{errorMessage}}</span>
        </form>
    </div>
    
</template>
<script>
import './RegisterPage.scss'
import {email, required, minLength} from 'vuelidate/lib/validators'
export default {
   data: () => ({
    errorMessage:'',
    email: '',
    password: '',
    name: '',
    dateOfBirth: ''
  }),
  validations:{
    email: {email,required},
    password: {required,minLength: minLength(6)},
    name:{required},
    dateOfBirth:{required,minLength: minLength(10)}
  }, 
  computed:{
    error(){
      return this.$store.getters.error
    }
  },
  watch:{
    error(fbError){
      console.log(fbError)
      // this.errorMessage = this.$error(fbError.code || 'Wrong')
      this.errorMessage = fbError.code || 'Something went wrong'
    }
  }, 
  methods:{
    async submitHandler(){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
        dateOfBirth: this.dateOfBirth
      }
      try {
        await this.$store.dispatch('register', formData)
        console.log(formData);
        this.$router.push('/home')
      } catch (e) {
        console.log(e)
      }
      
    }
  }
}
</script>