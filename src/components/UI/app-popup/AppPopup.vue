<template>
    <div class="popup">
        <div class="popup__header popup-header">
            <div class="popup-header__icon">
                <img src="assets/icons/alert_success_icon.svg" alt="success">
            </div>
            <div class="popup-header__title">Success</div>
            <div class="popup-header__close-button">
                <ion-icon name="close-outline">
            </ion-icon></div>
        </div>
        <div v-for="message in messages" :key="message.id" class="popup__body">
        </div>
    </div>
</template>
<script>
import '../app-popup/AppPopup.scss'
export default {
    props:{
        messages:{
            type: Array,
            default: () => {
                return []
            }
        }
    }
}
</script>