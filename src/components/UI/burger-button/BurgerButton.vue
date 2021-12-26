<template>
    <div id="burger"
        :class="{ 'active' : this.isBurgerActive }"
        @click.prevent="open()">
        <slot>
            <button type="button" class="burger-button" title="Menu">
                <span class="hidden">Toggle menu</span>
                <span class="burger-bar burger-bar--1"></span>
                <span class="burger-bar burger-bar--2"></span>
                <span class="burger-bar burger-bar--3"></span>
            </button>
        </slot>
    </div>
</template>
<script>
import "./BurgerButton.scss"
export default {
    computed: {
        isBurgerActive() {
            return this.$store.getters.isNavOpen
        }
    },
    methods: {
        open() {
            console.log(this.isBurgerActive)
            this.$store.commit('openSidebar')
            console.log(this.isBurgerActive)
        }
    }
}
</script>