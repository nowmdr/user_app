import firebase from 'firebase/compat/app'
export default{
     actions:{
         async login({dispatch, commit},{email, password}){
             try{
                await firebase.auth().signInWithEmailAndPassword(email, password)
                await dispatch('createCurrency')
             } catch(e){
                commit('setError', e)
                throw e
             }
         },
         async logout({commit}){
             await firebase.auth().signOut()
             await commit('clearInfo')
         },
         async register({dispatch, commit},{email, password, name, dateOfBirth,city, gender}){
             try {
                 await firebase.auth().createUserWithEmailAndPassword(email, password)
                 const uid = await dispatch('getUid')
                 await dispatch('createCurrency')
                 await firebase.database().ref(`/users/${uid}/info`).set({
                    dateOfBirth,
                    name,
                    city,
                    gender
                 })
                 
             } catch (e) {
                commit('setError', e)
                throw(e)
             }
         },
         getUid(){
             const user = firebase.auth().currentUser
             return user ? user.uid : null
         }


     }
}