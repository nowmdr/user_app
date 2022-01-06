<template>
    <div class="popup">
        <transition-group 
        class="popup__animation"
        name="transition-animation">
            <div v-for="message in messages" :key="message.id" class="popup__container">
                <div class="popup__header popup-header">
                    <div class="popup-header__icon">
                        <ion-icon name="warning" v-if="message.type == 'warning'" class="warning"></ion-icon>
                        <ion-icon name="checkmark-circle" v-if="message.type == 'success'" class="success"></ion-icon>
                        <ion-icon name="information-circle" v-if="message.type == 'info'" class="info"></ion-icon>
                        <ion-icon name="alert-circle" v-if="message.type == 'error'" class="error"></ion-icon>
                    </div>
                    <div class="popup-header__title" v-if="message.type == 'warning'">Warning</div>
                    <div class="popup-header__title" v-if="message.type == 'success'">Success</div>
                    <div class="popup-header__title" v-if="message.type == 'info'">Info</div>
                    <div class="popup-header__title" v-if="message.type == 'error'">Error</div>
                    <button @click.prevent="closePopup()" class="popup-header__close-button">
                        <ion-icon name="close-outline"></ion-icon>
                    </button>
                </div>
                <div class="popup__message">{{message.name}}</div>
            </div>
        </transition-group>
    </div>
</template>
<script>
import '../app-popup/AppPopup.scss'
export default {
    // props:{
    //     messages:{
    //         type: Array,
    //         default: () => {
    //             return []
    //         }
    //     },
    //     timeout:{
    //         type: Number,
    //         default: 2000
    //     }
    // },
    data:() =>({
        messages: []
    }),
    computed:{
        messagesArr(){
            return this.$store.getters.messages
        }  
    },
    methods:{
        closePopup(){
            this.messages.splice(this.messages.length - 1, 1)
        },
        hidePopup(){
            let vm = this;
            if(this.messages.length){
                setTimeout(function(){
                vm.messages.splice(vm.messages.length - 1, 1)
                }, 2500)
            }
        }
    },
    mounted(){
        this.hidePopup()
        this.messages = this.messagesArr
    },
    watch:{
        messages(){
            this.hidePopup()
        }
    }
}
</script>