<template>
    <div @click="click()" class="app-card">
        <slot></slot>
    </div>
</template>
<script>
import './AppCard.scss'
export default {
    methods:{
        click(){
            this.$emit('click')
        }
    }
}
</script>