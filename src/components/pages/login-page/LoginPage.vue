<template>
    <div class="login">
        <h3 class="title">Authorization</h3>
        <form class="form app-form" @submit.prevent="submitHandler()">
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
          <button class="app-button" type="submit">Submit</button>
          <router-link style="margin-top:15px" to="/register">Register</router-link>
          <span>{{errorMessage}}</span>
        </form>
    </div>
</template>
<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import './LoginPage.scss'
export default {
  components: {  },
  name: 'login-page',
  data: () => ({
    errorMessage:'',
    email: '',
    password: ''
  }),
  computed:{
    error(){
      return this.$store.getters.error
    }
  },
  watch:{
    error(fbError){
      console.log(fbError)
      // this.errorMessage = this.$error(fbError.message || 'Wrong')
      this.errorMessage = fbError.message || 'Something went wrong'
    }
  }, 
  validations:{
    email: {email,required},
    password: {required,minLength: minLength(6)}
  },
  methods:{
    async submitHandler(){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formData)
        console.log(formData);
        this.$router.push('/home')
      } catch (e) {
        
      }
      
    }
  }
}
</script>