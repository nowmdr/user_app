<template>
<div class="header">
    <div class="header__container">
        <nav class="header__menu menu">
            <ul class="menu__list">
                <li class="menu__item"><router-link to="/home">Home</router-link></li>
                <li class="menu__item"><router-link to="/weather">Weather</router-link></li>
                <li class="menu__item"><router-link to="/exchange">Exchange</router-link></li>
            </ul>
            <a class="app-link" @click.prevent="logout()">Logout</a>
        </nav>
    </div>
</div>  
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import './Header.scss'
import firebase from 'firebase/compat/app'

export default {
    data:() => ({
        active: false
    }),
    methods:{
        async logout(){
           await this.$store.dispatch('logout');
           this.$router.push('/login?message=logout');
       },
       addActive(){
           this.active = !this.active
           console.log(this.$route)
           console.log(this.active)
       }
   },
   mounted(){

   }
    // mounted(){
    //     const currentUser = firebase.auth().currentUser
    //    if (currentUser) {
    //        return currentUser
    //    }
    // },
}
</script>
