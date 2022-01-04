<template>
    <div class="header">
        <div class="header__container">
            <nav class="header__menu menu">
                <BurgerButton/>
                <Sidebar :links="this.links"/>
                <ul class="menu__list">
                    <li v-for="link in links" :key="link.name"
                    class="menu__item">
                        <router-link
                        :to="link.route"
                        active-class="active"
                        >{{link.name}}</router-link>
                    </li>
                </ul>
                <a class="app-link logout-link" @click.prevent="logout()">Logout</a>
            </nav>
        </div>
    </div>  
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import './Header.scss'
import firebase from 'firebase/compat/app'
import BurgerButton from '../../UI/burger-button/BurgerButton.vue'
import Sidebar from '../../UI/sidebar/Sidebar.vue'


export default {
  components: { BurgerButton, Sidebar },
    data:() => ({
        links: [
            {
                name: 'Home',
                route: '/home',
            },
            {
                name: 'Weather',
                route: '/weather',
            },
            {
                name: 'Exchange',
                route: '/exchange',
            },
            {
                name: 'Posts',
                route: '/posts',
            },
        ],
    }),
    methods:{
        async logout(){
           await this.$store.dispatch('logout');
           this.$router.push('/login?message=logout');
        },
        closeSidebarPanel() {
                this.$store.commit('closeSidebar')
            },
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
