import firebase from 'firebase/compat/app'
export default{
     actions:{
         async login({dispatch, commit},{email, password}){
             try{
                await firebase.auth().signInWithEmailAndPassword(email, password)
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
        //  async editData({dispatch, commit},{name, dateOfBirth, phone, address,about}){
        //     try {
        //         const uid = await dispatch('getUid')
        //         await firebase.database().ref(`/users/${uid}/info`).set({
        //             name,
        //             dateOfBirth,
        //             address,
        //             about,
        //             phone
        //         })
        //     } catch (e) {
        //         console.log(e)
        //     }
        //  },
         getUid(){
             const user = firebase.auth().currentUser
             return user ? user.uid : null
         }


     }
}