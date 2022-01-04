<template>
    <div>
        <loader-page v-if="loader"></loader-page>
        <div class="post" v-else>
            <div class="post__container" v-if="post">
                <h1 class="post__title">{{post.title}}</h1>
                <p v-html="post.body" class="post__body"></p>
            </div>
        </div>
    </div>
</template>
<script>
import LoaderPage from '../../loader-page/LoaderPage.vue'
import '../post-page/PostPage.scss'
export default {
  components: { LoaderPage },
    data:() => ({
        id: '',
        post: null,
        loader: true
    }),
    mounted(){
        this.id = this.$route.params.id
        this.post = this.getPosts[this.id]
        console.log(this.getPosts)
        console.log(this.id)
        console.log(this.post)
        this.loader = false

    },
    computed:{
        getPosts(){
            return this.$store.getters.posts
        }
    }
}
</script>