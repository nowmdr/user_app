import firebase from "firebase/compat/app"
export default{
    state:{
        info:{}
    },
    mutations:{
        setInfo(state, info ){
            state.info = info
        },
        clearInfo(state){
             state.info = {}
        }
    },
    actions: {
        async fetchInfo({dispatch, commit}){
            try {
                const uid = await dispatch('getUid')
                const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
                commit('setInfo', info)
                return info
            } catch (e) {
                commit('setError', e)
            }  
        },
        async updateInfo({dispatch, commit},{name, dateOfBirth,city,gender,cityOfWeather}){
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/info`).set({
                    dateOfBirth,
                    name,
                    city,
                    gender,
                    cityOfWeather
                 })
                // const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
                commit('setInfo', info)
            } catch (e) {
                commit('setError', e)
            }  
        }
    },
    getters:{
        info: s => s.info
    }
}