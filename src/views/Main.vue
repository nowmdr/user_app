<template>
    <div>
        <Header/>
        <div class="main">
            <router-view />
        </div>
        
    </div>  
</template>
<script>

import '../theme/main.scss'
import Header from '../components/main-layout/Header/Header.vue'
import LoginPage from '../components/pages/login-page/LoginPage.vue'

export default{
    
    components: { Header, LoginPage }
  
    
}
</script>

