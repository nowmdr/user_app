<template>
    <div @click="click()" class="delete-button">
        <ion-icon name="trash-outline"></ion-icon>
    </div>
</template>
<script>
import './DeleteButton.scss'
export default {
    methods:{
        click(){
             this.$emit('click')
        }
    }
}
</script>