
export default{
    
    install(Vue, options){
         Vue.prototype.$message = function(html){
            M.toast({html:`<div class="app-toast-message">${html}</div>`})
         }
         Vue.prototype.$error = function(html){
            M.toast({html:`<div class="app-toast-error">Oops.. ${html}</div>`})
         }
         Vue.prototype.$popupSuccess = function(message){
            const arr = {
               message: message,
               type: 'success'
            }
            this.$store.dispatch('pushMessage', arr)
         }
         Vue.prototype.$popupWarning = function(message){
            const arr = {
               message: message,
               type: 'warning'
            }
            this.$store.dispatch('pushMessage', arr)
         }
         Vue.prototype.$popupError = function(message){
            const arr = {
               message: message,
               type: 'error'
            }
            this.$store.dispatch('pushMessage', arr)
         }
         Vue.prototype.$popupInfo = function(message){
            const arr = {
               message: message,
               type: 'info'
            }
            this.$store.dispatch('pushMessage', arr)
         }
    }
}