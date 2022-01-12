<template>
    <div>
        <loader-page v-if="loader"></loader-page>
        <div class="post" v-else>
            
            <div class="post__container" v-if="post">
                <div class="post__card">
                    <div class="post__header">

                        <!-- <div class="post__img">
                            <img v-if="post.imageUrl" :src="`${post.imageUrl}`" alt="cover">
                            <img v-else src="https://cdn.liveagent.com/app/uploads/2021/06/sigmund-59yRYIHWtzY-unsplash.jpg" alt="cover">
                        </div> -->
                        <div class="post__info" :style="{backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),url(${backgroundUrl})`}">
                            <div class="post__date">
                                <ion-icon name="calendar-outline"></ion-icon>
                                <span v-if="post.date">{{post.date | date('date')}}</span> 
                                <span v-else>{{date | date('date')}}</span>
                            </div>
                            <h3 class="post__title">{{post.title}}</h3>
                            <span class="post__subtitle">{{post.subtitle}}</span>
                        </div>
                    </div>
                    <div class="post__body">
                        <p v-html="post.body" class="post__text"></p>
                    </div>
                </div>
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
        date: new Date,
        id: '',
        post: null,
        loader: true,
        index: '',
        backgroundUrl: ''
    }),
    mounted(){
        
        // this.index = this.getPosts.findIndex((element,index) => {
        //     if(element.id = this.id){
        //         return index
        //     }
        // })
        // this.post = this.getPosts[this.index]
        this.filterPosts()
        this.loader = false
    },
    computed:{
        getPosts(){
            return this.$store.getters.posts
        }
    },
    methods:{
        filterPosts(){
            if(this.getPosts){
                this.id = this.$route.params.id
                this.post = (this.getPosts.filter(post => post.id == this.id))[0]
                if(!this.post.imageUrl){
                    this.backgroundUrl = 'https://cdn.liveagent.com/app/uploads/2021/06/sigmund-59yRYIHWtzY-unsplash.jpg'
                } else {
                    this.backgroundUrl = this.post.imageUrl
                }
            }
        }
    }
}
</script>