<template>
    <div @click="click()" class="copy-button">
        <ion-icon name="copy-outline"></ion-icon>
    </div>
</template>
<script>
import './CopyButton.scss'
import messages from '../../../utils/messages'
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
                console.log(result)

                navigator.clipboard.writeText(result)
                // this.$emit('click')
                this.$message('Data copied')
            } else {
                this.$error('Nothing to copie')
            }
        },
    }
}
</script>