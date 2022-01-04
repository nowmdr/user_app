<template>
    <div class="add-post-button" @click="click()">Create post
        <ion-icon name="add-outline"></ion-icon>
    </div>
</template>
<script>
import './AddPostButton.scss'
export default {
    methods:{
        click(){
            this.$emit('click')
        }
    }
}
</script>