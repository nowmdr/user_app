<template>
    <div class="main">
        <Header/>
        <div class="main__body">
            <app-popup></app-popup>
            <router-view />
        </div>
        <Footer/>
    </div>  
</template>
<script>

import '../theme/main.scss'
import Header from '../components/main-layout/Header/Header.vue'
import LoginPage from '../components/pages/login-page/LoginPage.vue'
import firebase from "firebase/compat/app"
import Footer from '../components/main-layout/Footer/Footer.vue'
import AppPopup from '../components/UI/app-popup/AppPopup.vue'

export default{
    
    components: { Header, LoginPage, Footer, AppPopup },
    mounted(){
        const currentUser = firebase.auth().currentUser
        if (!currentUser) {
           this.$router.push('/login').catch(err => {})
        } else {
            this.$router.push('/home').catch(err => {})
        }
    }
    
}
</script>

