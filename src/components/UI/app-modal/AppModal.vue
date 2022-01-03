<template>
    <div 
    class="app-modal" 
    @click="closeModal()"
    v-if="show">
        <div @click.stop class="app-modal__content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import './AppModal.scss'
export default {
    props:{
        show:{
            type: Boolean,
            default: false
        }
    },
    methods:{
        closeModal(){   
            this.$emit('update:show', false) 
        }
    }
}
</script>