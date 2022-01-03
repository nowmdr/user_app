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
                 const post = {
                    title: 'Hello, it is your first post',
                    body:'Hello it is small body of your post'
                 }
                 await firebase.database().ref(`/users/${uid}/posts`).set({
                    post
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