<template>
    <app-card>
        <form class="post-form">
            <h3 class="title post-form__title">New post</h3>
            <input 
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.reqiured}"
            class="app-input post-form__input" 
            placeholder="Post title"
            type="text">
            <span v-if="$v.title.$dirty && !$v.title.reqiured">Title field is required</span>
            <div>
                <textarea 
                v-model="body"
                class="app-input post-form__text" 
                placeholder="Type your post here"
                ></textarea>
            </div>
            <button @click.prevent="createPost()" class="app-button post-form__send-button">Create new post</button>
        </form>
    </app-card>
</template>
<script>
import AppCard from '../../../UI/app-card/AppCard.vue'
import {required, minLength} from 'vuelidate/lib/validators'
import './PostForm.scss'
export default {
    components: { AppCard },
    data:() => ({
        title: '',
        body: ' '
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
                this.$message('Post was created!')
            } catch (e) {}
            
        }
    },
    
}
</script>