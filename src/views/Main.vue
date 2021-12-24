<template>
    <div class="main">
        <Header/>
        <div class="main__body">
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

export default{
    
    components: { Header, LoginPage, Footer },
    mounted(){
        const currentUser = firebase.auth().currentUser
        console.log(currentUser)
        if (!currentUser) {
           this.$router.push('/login').catch(err => {})
        } else {
            this.$router.push('/home').catch(err => {})
        }
        console.log(document.cookie)
    }
    
}
</script>

