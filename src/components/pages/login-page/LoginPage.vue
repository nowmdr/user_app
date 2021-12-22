<template>
    <div class="login">
        <h3 class="title">Authorization</h3>
        <form class="login-form app-form" @submit.prevent="submitHandler()">
          <div class="app-form__input">
            <input 
            class="app-input" 
            type="text" 
            placeholder="Email..." 
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
            >
            <span
            v-if="$v.email.$dirty && !$v.email.required"
            >email is empty</span>
            <span
            v-else-if="$v.email.$dirty && !$v.email.email"
            >your email is incorrect</span>
          </div>
          <div class="app-form__input">
            <input 
            class="app-input" 
            type="password" 
            placeholder="Password..." 
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.email.minLength)}" 
            >
            <span
            v-if="$v.password.$dirty && !$v.password.required"
            >password is empty</span>
            <span
            v-if="$v.password.$dirty && !$v.password.minLength"
            >password dont be less than 6 symbols, now is {{password.length}}</span>
          </div>
          <button class="app-button" type="submit">Submit</button>
          <router-link class="app-link login-form__link" to="/register">Register</router-link>
        </form>
    </div>
</template>
<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import './LoginPage.scss'
import messages from '../../../utils/messages'
export default {
  components: {  },
  name: 'login-page',
  data: () => ({
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
      console.log(fbError.code)
      this.$error(messages[fbError.code] || 'Something wrong, try again') 
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
      } catch (e) {}
    }
  },
  mounted(){
    if (messages[this.$route.query.message]) {
        this.$message(messages[this.$route.query.message])
    }
  }
}
</script>