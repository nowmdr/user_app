<template>
    <div class="sidebar">
        <div class="sidebar__backdrop" @click.prevent="closeSidebarPanel" v-if="this.isPanelOpen"></div>
        <transition name="slide">
            <div v-if="this.isPanelOpen"
                 class="sidebar__panel">
                <ul class="sidebar-menu">
                    <li v-for="link in links" :key="link.name"
                    @click="closeSidebarPanel" 
                    class="sidebar-menu__item">
                        <router-link 
                        :to="link.route"
                        active-class="active"
                        >{{link.name}}</router-link>
                    </li>
                    <a class="app-link sidebar-menu__item" @click.prevent="logout()">Logout</a>
                </ul>
            </div>
        </transition>
    </div>
</template>
<script>
import "./Sidebar.scss"
export default {
    data: () => ({
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
    ],
    }),
    methods: {
        async logout(){
            this.$store.commit('closeSidebar')
            await this.$store.dispatch('logout');
            this.$router.push('/login?message=logout');
        },
        closeSidebarPanel() {
            console.log(this.isPanelOpen)
            this.$store.commit('closeSidebar')
            console.log(this.isPanelOpen)
        }
    },
    computed: {
        isPanelOpen() {
            return this.$store.getters.isNavOpen
        }
    }
}
</script>