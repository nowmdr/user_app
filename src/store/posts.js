import firebase from 'firebase/compat/app'
import axios from 'axios'
export default{
    state:{
        posts:{}
    },
    mutations:{
        setPosts(state, posts ){
            state.posts = posts
        },
        clearPosts(state){
             state.posts = {}
        }
    },
    actions: {
        async fetchNativePosts(){
            try {
                const response = (await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10`)).data
                console.log(response)
                return response
            } catch (error) {
                commit('setError', e)
            }
        },
        async getPosts({dispatch, commit}){
            try {
                const uid = await dispatch('getUid')
                const posts = (await firebase.database().ref(`/users/${uid}/posts`).once('value')).val()
                commit('setPosts', posts)
                return Object.keys(posts).map(key => ({...posts[key], id:key}))
            } catch (e) {
                commit('setError', e)
            }  
        },
        async addPost({dispatch, commit},{title, subtitle, body ,date, imageUrl}){
            try {
                const uid = await dispatch('getUid')
                console.log(title + subtitle + body + date + imageUrl)
                const post = await firebase.database().ref(`/users/${uid}/posts`).push({
                    imageUrl,
                    date,
                    title,
                    subtitle,
                    body
                 })
                 return{
                     title,body, id: post.key,date, imageUrl
                 }
                // const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
                // commit('setInfo', info)
            } catch (e) {
                commit('setError', e)
            }  
        },
        async updatePosts({dispatch, commit},{posts}){
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/posts`).set({
                    posts
                 })
                //  return{
                //      title,body, id: post.key
                //  }
            } catch (e) {
                commit('setError', e)
            }  
        },
        async deletePost({dispatch, commit},id){
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/posts/${id}`).remove()
                // undefined? WTF?
                console.log(id)
            } catch (e) {
                commit('setError', e)
            }  
        }
    },
    getters:{
        posts: s => s.posts
    }
}