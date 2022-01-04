<template>
    <div>
        <loader-page v-if="loader"></loader-page>
        <div v-else class="posts-page">
            <app-modal :show.sync="modalVisible">
                <post-form></post-form>
            </app-modal>
            <h1 class="title">Welcome</h1>
            <div class="posts-page__options">
                <div><input v-model="sortByTitle" placeholder="Search by a title..." class="app-input" type="text"></div>
                <span v-if="!searchedPosts || !searchedPosts.length">oops nothing to show</span>
                <add-post-button @click="modalOpen()"></add-post-button>
            </div>
            <div class="posts-page__container">
                    <app-card @click="postOpen(post)" class="posts-page__item post-card" v-for="post of searchedPosts" :key="post.id">
                        <h3 class="post-card__title">{{post.title}}</h3>
                        <p class="post-card__body" v-html="post.body"></p>
                        <!-- <delete-button @click="deletePost(post)"></delete-button> -->
                    </app-card>
            </div>
        
        </div> 
    </div>
    
</template>
<script>
import AddPostButton from '../../../UI/add-post-button/AddPostButton.vue'
import AppCard from '../../../UI/app-card/AppCard.vue'
import AppModal from '../../../UI/app-modal/AppModal.vue'
import DeleteButton from '../../../UI/delete-buttion/DeleteButton.vue'
import RefreshButton from '../../../UI/refresh-button/refreshButton.vue'
import LoaderPage from '../../loader-page/LoaderPage.vue'
import PostForm from '../post-form/PostForm.vue'
import './PostsPage.scss'
export default {
    components: { AppCard, DeleteButton, AddPostButton, RefreshButton, AppModal, PostForm, LoaderPage  },
    computed:{
        getPosts(){
            return this.$store.getters.posts
        }
    },
    data:() => ({
        copyPosts: null,
        searchedPosts: null,
        filterCopyPosts: '',
        modalVisible: false,
        sortByTitle:'',
        loader: true
    }),
    async mounted(){
        await this.fetchPosts()
        console.log(this.copyPosts)
        this.loader = false
    },
    methods:{
        async fetchPosts(){
            this.copyPosts = await this.$store.dispatch('getPosts')
            this.searchedPosts = this.copyPosts
        },
        async deletePost(post){
            console.log(post)
            // this.copyPosts = this.copyPosts.filter(p => p.id !== post.id)
            // console.log(this.copyPosts)
            // await this.$store.dispatch('updatePosts', this.copyPosts)
            await this.$store.dispatch('deletePost', post.id)
            this.copyPosts = await this.$store.dispatch('getPosts')
        },
        modalOpen(){
            this.modalVisible = true
        },
        postOpen(post){
            this.$router.push(`/posts/${post.id}`)
        }
    },
    watch:{
        sortByTitle: function(){
            this.searchedPosts = this.copyPosts.filter(post => post.title.toLowerCase().includes(this.sortByTitle.toLowerCase()))
            console.log(this.searchedPosts)
        },
        modalVisible: async function(){
           if (!this.modalVisible) {
               await this.fetchPosts()
           }
        }
    }

}
</script>