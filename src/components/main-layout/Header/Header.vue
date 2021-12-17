<template>
<div class="header">
    <div class="header__container">
        <nav class="header__menu menu">
            <ul class="menu__list">
                <li class="menu__item"><router-link to="/home">Home</router-link></li>
                <li class="menu__item"><router-link to="/weather">Weather</router-link></li>
                <li class="menu__item"><router-link to="/exchange">Exchange</router-link></li>
                <li class="menu__item"><router-link to="/login">Login</router-link></li>
                <li class="menu__item"><button class="app-button" @click.prevent="logout()">Logout</button></li>
            </ul>
        </nav>
    </div>
</div>  
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import './Header.scss'

export default {
   methods:{
       async logout(){
           await this.$store.dispatch('logout');
           this.$router.push('/login');
       }
   }
}
</script>
