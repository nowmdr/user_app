<template>
  <div @click="click()" class="close-button">
    <ion-icon name="close-outline"></ion-icon>
  </div>
</template>
<script>
export default {
    methods:{
        click(){
            this.$emit('click')
        }
    }
}
</script>
