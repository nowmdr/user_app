<template>
    <div>
        <Header/>
        <div class="main">
            <!-- <h1 class="title">Main</h1> -->
        </div>
        
        <router-view />
        <!-- <login-page/> -->
    </div>  
</template>
<script>
// import Header from '@/components/main-layout/header/Header.vue'
// import { defineComponent } from '@vue/composition-api'
import '../theme/main.scss'
import Header from '../components/main-layout/Header/Header.vue'
import LoginPage from '../components/pages/login-page/LoginPage.vue'

export default{
    
    components: { Header, LoginPage }
  
    
}
</script>

<style lang="scss">

</style>
