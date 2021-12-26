import store from "."

export default{
    state:{
        isNavOpen: false
    },
    mutations:{
        openSidebar(state){
            state.isNavOpen = true
        },
        closeSidebar(state){
            state.isNavOpen = false
        }
    },
    getters:{
        isNavOpen: s => s.isNavOpen
    }
}