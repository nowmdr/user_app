<template>
    <app-card>
        <div v-if="success" class="post-success">
            <h3 class="post-success__title title">Hooray!<br>The post has been successfully created.</h3>
            <div class="post-success__links">
                <add-post-button class="post-button" @click="success=false"></add-post-button>
            </div>
        </div>
        <form v-else class="post-form">
            <h3 class="title post-form__title">New post</h3>
            <input 
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.reqiured}"
            class="app-input post-form__input" 
            placeholder="Post title"
            type="text">
            <input 
            v-model="subtitle"
            class="app-input post-form__input" 
            placeholder="Subtitle - is not required"
            type="text">
            <textarea 
            v-model="body"
            class="app-input post-form__text" 
            placeholder="Type your post here, you can use HTML tags also"
            ></textarea>
            <input 
            v-model="imageUrl"
            class="app-input post-form__input" 
            placeholder="Paste image URL here"
            type="text">
            <button @click.prevent="createPost()" class="app-button post-form__send-button">Create new post</button>
            <!-- <img v-bind:src="`${imageUrl}`" alt="url"> -->
        </form>
    </app-card>
</template>
<script>
import AppCard from '../../../UI/app-card/AppCard.vue'
import {required, minLength} from 'vuelidate/lib/validators'
import './PostForm.scss'
import AddPostButton from '../../../UI/add-post-button/AddPostButton.vue'
export default {
    components: { AppCard, AddPostButton },
    data:() => ({
        imageUrl: '', 
        date: '',
        title: '',
        subtitle: '',
        body: '',
        success: false,
    }),
    validations:{
        title:{required, minLength},
        body:{required, minLength }
    },
    watch:{
         imageUrl(){
             console.log(this.imageUrl)
         }
    },
    methods:{
        async createPost(){
            if (this.$v.$invalid) {
                this.$v.$touch()
                return 
            }
            console.log(this.imageUrl)
            try {
                this.date = new Date()
                    console.log(this.imageUrl)
                const post = await this.$store.dispatch('addPost',{
                    date:  this.date,
                    title: this.title,
                    subtitle: this.subtitle,
                    body: this.body,
                    imageUrl: this.imageUrl
                })
                console.log(post)
                this.$v.$reset()
                this.subtitle =''
                this.title = ''
                this.body = ''
                this.success = true
            } catch (e) {}
        },
    }, 
}
</script>