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
            :class="{invalid: ($v.title.$dirty && !$v.title.reqiured) || ($v.title.$dirty && !$v.title.minLength) || ($v.title.$dirty && !$v.title.maxLength)}"
            class="app-input post-form__input" 
            placeholder="Post title"
            type="text">
            <div class="validation-text">
                <span class="error-text"
                v-if="$v.title.$dirty && !$v.title.required"
                >Title is empty - type something</span>
                <span class="error-text"
                v-if="$v.title.$dirty && !$v.title.minLength"
                >Title dont be less than 10 symbols, now {{title.length}} </span>
                <span class="error-text"
                v-if="$v.title.$dirty && !$v.title.maxLength"
                >Maximum title size is 15 symbols, now {{title.length}} </span>
            </div>
            <input 
            v-model="subtitle"
            :class="{invalid: ($v.subtitle.$dirty && !$v.subtitle.reqiured) || ($v.subtitle.$dirty && !$v.subtitle.minLength) || ($v.subtitle.$dirty && !$v.subtitle.maxLength)}"
            class="app-input post-form__input" 
            placeholder="Subtitle - is not required"
            type="text">
            <div class="validation-text">
                <span class="error-text"
                v-if="$v.subtitle.$dirty && !$v.subtitle.required"
                >Subtitle is empty - type something</span>
                <span class="error-text"
                v-if="$v.subtitle.$dirty && !$v.subtitle.minLength"
                >Subtitle dont be less than 2 symbols, now {{subtitle.length}} </span>
                <span class="error-text"
                v-if="$v.subtitle.$dirty && !$v.subtitle.maxLength"
                >Maximum subtitle size is 10 symbols, now {{subtitle.length}} </span>
            </div>
            <textarea 
            v-model="body"
            :class="{invalid: ($v.body.$dirty && !$v.body.reqiured) || ($v.body.$dirty && !$v.body.minLength)}"
            class="app-input post-form__text" 
            placeholder="Type your post here, you can use HTML tags also"
            ></textarea>
            <div class="validation-text">
                <span class="error-text"
                v-if="$v.body.$dirty && !$v.body.required"
                >Body is empty - type something</span>
                <span class="error-text"
                v-if="$v.body.$dirty && !$v.body.minLength"
                >Subtitle dont be less than 10 symbols, now {{body.length}} </span>
            </div>
            <input 
            v-model="imageUrl"
            :class="{invalid: ($v.imageUrl.$dirty && !$v.imageUrl.url)}"
            class="app-input post-form__input" 
            placeholder="Paste image URL here"
            type="text">
            <div class="validation-text">
                <span class="error-text"
                v-if="$v.imageUrl.$dirty && !$v.imageUrl.url"
                >Its not URl, try again</span>
            </div>
            <button @click.prevent="createPost()" class="app-button post-form__send-button">Create new post</button>
            <!-- <img v-bind:src="`${imageUrl}`" alt="url"> -->
        </form>
    </app-card>
</template>
<script>
import AppCard from '../../../UI/app-card/AppCard.vue'
import {required, minLength, maxLength, url} from 'vuelidate/lib/validators'
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
        title:{required, minLength: minLength(10), maxLength: maxLength(15)},
        subtitle:{required, minLength: minLength(2), maxLength: maxLength(10)},
        body:{required, minLength: minLength(10) },
        imageUrl:{url}
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