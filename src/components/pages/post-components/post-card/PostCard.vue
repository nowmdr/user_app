<template>
    <div class="post-card">
        <div class="post-card__background-img">
            <!-- src="https://cdn.liveagent.com/app/uploads/2021/11/The-20-best-forum-software.svg" -->
            <!-- <img src="https://cdn.liveagent.com/app/uploads/2021/11/The-20-best-forum-software.svg" alt="cover"> -->
            <!-- https://cdn.liveagent.com/app/uploads/2021/06/sigmund-59yRYIHWtzY-unsplash.jpg -->
            <!-- <img src="https://cdn.liveagent.com/app/uploads/2021/06/sigmund-59yRYIHWtzY-unsplash.jpg" alt="cover"> -->
            <!-- https://images.unsplash.com/photo-1482941852327-72b6c614e4fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=691&q=80 -->
            <img v-if="post.imageUrl" :src="`${post.imageUrl}`" alt="cover">
            <img v-else src="https://cdn.liveagent.com/app/uploads/2021/06/sigmund-59yRYIHWtzY-unsplash.jpg" alt="cover">
        </div>
        <div class="post-card__info">
            <div class="post-card__date">
                <ion-icon name="calendar-outline"></ion-icon>
                <span v-if="post.date">{{post.date | date('date')}}</span>
                <span v-else>{{date | date('date')}}</span> 
            </div>
            <h3 class="post-card__title">{{post.title}}</h3>
            <span v-if="post.subtitle" class="post-card__subtitle">{{post.subtitle}}</span>
            <p class="post-card__body" v-html="post.body.substring(0, 270) + '…'"></p>
            <a @click="open(post)" class="post-card__link">Learn more</a>
            <!-- <delete-button @click="deletePost(post)"></delete-button> -->
        </div>
    </div>
</template>
<script>
import DeleteButton from '../../../UI/delete-buttion/DeleteButton.vue'
import './PostCard.scss'
export default {
  components: { DeleteButton },
  data:() => ({
      date: new Date
  }),
    props:{
        post:{
            
        }
    },
    mounted(){
        // console.log(post) 
    },
    methods:{
        open(post){
            this.$emit('open', post)
        },
        deletePost(post){
            this.$emit('delete', post)
        }
    }
}
</script>