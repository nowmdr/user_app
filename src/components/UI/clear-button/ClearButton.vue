<template>
    <div @click="click()" class="clear-button">
        <ion-icon name="trash-outline"></ion-icon>
    </div>
</template>
<script>
import "./ClearButton.scss"
export default {
    props:{
        clear:{
            type: String
        }
    },
    methods:{
        click(){
             this.$emit('click')
        }
    }
}
</script>