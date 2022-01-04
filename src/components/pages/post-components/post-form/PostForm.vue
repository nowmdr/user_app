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
            <span v-if="$v.title.$dirty && !$v.title.reqiured">Title field is required</span>
            <textarea 
            v-model="body"
            class="app-input post-form__text" 
            placeholder="Type your post here, you can use HTML tags also"
            ></textarea>
            <button @click.prevent="createPost()" class="app-button post-form__send-button">Create new post</button>
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
        title: '',
        body: '',
        success: false,
    }),
    validations:{
        title:{required, minLength},
        body:{required, minLength }
    },
    methods:{
        async createPost(){
            if (this.$v.$invalid) {
                this.$v.$touch()
                return 
            }
            try {
                const post = await this.$store.dispatch('addPost',{
                    title: this.title,
                    body: this.body
                })
                console.log(post)
                this.$v.$reset()
                this.title = ''
                this.body = ''
                this.success = true
            } catch (e) {}
        },
    }, 
}
</script>