
export default{
    
    install(Vue, options){
         Vue.prototype.$message = function(html){
            M.toast({html:`<div class="app-toast-message">${html}</div>`})
         }
         Vue.prototype.$error = function(html){
            M.toast({html:`<div class="app-toast-error">Oops.. ${html}</div>`})
         }
    }
}