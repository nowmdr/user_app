<template>
    <div>
        <h1 class="title">Hi</h1>
        <app-card v-for="post of copyPosts" :key="post.id">
            <h3 class="title">{{post.title}}</h3>
            <p>{{post.body}}</p>
        </app-card>
    </div> 
</template>
<script>
import AppCard from '../../../UI/app-card/AppCard.vue'
export default {
    components: { AppCard },
    computed:{
        getPosts(){
            return this.$store.getters.posts
        }
    },
    data:() => ({
        copyPosts: null
    }),
    async mounted(){
        this.copyPosts = await this.$store.dispatch('getPosts')
        console.log(this.copyPosts)
    }
}
</script>