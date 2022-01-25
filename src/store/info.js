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
        async updateInfo({dispatch, commit},{name, dateOfBirth,city,gender,cityOfWeather,photoUrl}){
            if (!photoUrl){
                photoUrl = 'https://media.istockphoto.com/vectors/fi/avatar-profiilin-oletuskuvakkeen-vektori-id1337144146?b=1&k=20&m=1337144146&s=170667a&w=0&h=ys-RUZbXzQ-FQdLstHeWshI4ViJuEhyEa4AzQNQ0rFI='
            }
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/info`).set({
                    dateOfBirth,
                    name,
                    city,
                    gender,
                    cityOfWeather,
                    photoUrl
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