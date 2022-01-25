<template>
    <div 
    class="app-modal" 
    @click="closeModal()"
    v-if="showModal">
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
    computed:{
        showModal(){
            return this.$store.getters.showModal
        }
    },
    methods:{
        closeModal(){  
            this.$store.commit('toggleModal') 
            // this.$emit('update:show', false) 
        }
    }
}
</script>