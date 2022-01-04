import firebase from 'firebase/compat/app'
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
        async addPost({dispatch, commit},{title, body}){
            try {
                const uid = await dispatch('getUid')
                const post = await firebase.database().ref(`/users/${uid}/posts`).push({
                    title,
                    body
                 })
                 return{
                     title,body, id: post.key
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
        async deletePost({dispatch, commit},{id}){
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