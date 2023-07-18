<template>
    <div @click="click()" class="copy-button">
        <ion-icon name="copy-outline"></ion-icon>
    </div>
</template>
<script>
import './CopyButton.scss'
export default {
    props:{
        copy:{
            default: "default"
        }
    },
    methods:{
        click(){
            if (this.copy) {
                const result = eval(this.copy).toFixed(2)

                navigator.clipboard.writeText(result)
                // this.$emit('click')
                this.$popupInfo('Data copied')
            } else {
                this.$error('Nothing to copie')
            }
        },
    }
}
</script>