export default{
    state:{
        messages:[]
    },
    mutations:{
        addMessage(state, messages){
            state.messages = messages
        },
        deleteMessage(state,message){

        }
    },
    actions:{
        pushMessage({dispatch, commit,state},{message, type}){
            let timeStamp = Date.now().toLocaleString()
            const newMessages = state.messages
            newMessages.push({name: message, id: timeStamp, type: type })
            commit('addMessage', newMessages)
        }
    },
    getters:{
        messages: s => s.messages
    }
}