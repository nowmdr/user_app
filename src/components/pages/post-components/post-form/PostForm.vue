<template>
  <div class="post-form-wrapper">
    <div v-if="success" class="post-success">
      <h3 class="post-success__title title">
        Hooray!<br />The post has been successfully created.
      </h3>
      <div class="post-success__links">
        <add-post-button
          class="post-button"
          @click="success = false"
        ></add-post-button>
      </div>
    </div>
    <form v-else class="post-form">
      <h3 class="title post-form__title">New post</h3>
      <input
        v-model="title"
        :class="{
          invalid:
            ($v.title.$dirty && !$v.title.reqiured) ||
            ($v.title.$dirty && !$v.title.minLength) ||
            ($v.title.$dirty && !$v.title.maxLength),
        }"
        class="app-input post-form__input"
        placeholder="Post title"
        type="text"
      />
      <div class="validation-text">
        <span class="error-text" v-if="$v.title.$dirty && !$v.title.required"
          >Title is empty - type something</span
        >
        <span class="error-text" v-if="$v.title.$dirty && !$v.title.minLength"
          >Title dont be less than 10 symbols, now {{ title.length }}
        </span>
        <span class="error-text" v-if="$v.title.$dirty && !$v.title.maxLength"
          >Maximum title size is 100 symbols, now {{ title.length }}
        </span>
      </div>
      <input
        v-model="subtitle"
        :class="{
          invalid:
            ($v.subtitle.$dirty && !$v.subtitle.reqiured) ||
            ($v.subtitle.$dirty && !$v.subtitle.minLength) ||
            ($v.subtitle.$dirty && !$v.subtitle.maxLength),
        }"
        class="app-input post-form__input"
        placeholder="Subtitle"
        type="text"
      />
      <div class="validation-text">
        <span
          class="error-text"
          v-if="$v.subtitle.$dirty && !$v.subtitle.required"
          >Subtitle is empty - type something</span
        >
        <span
          class="error-text"
          v-if="$v.subtitle.$dirty && !$v.subtitle.minLength"
          >Subtitle dont be less than 2 symbols, now {{ subtitle.length }}
        </span>
        <span
          class="error-text"
          v-if="$v.subtitle.$dirty && !$v.subtitle.maxLength"
          >Maximum subtitle size is 10 symbols, now {{ subtitle.length }}
        </span>
      </div>
      <div class="post-form__text-editor">
        <quill-editor
          v-model="body"
          ref="myQuillEditor"
          :options="editorOption"
		    />
      </div>
      <!-- <textarea
        v-model="body"
        :class="{
          invalid:
            ($v.body.$dirty && !$v.body.reqiured) ||
            ($v.body.$dirty && !$v.body.minLength),
        }"
        class="app-input post-form__text"
        placeholder="Type your post here, you can use HTML tags also"
      ></textarea> -->
      <!-- <vue-editor v-model="content"></vue-editor> -->
      
      <div class="validation-text">
        <span class="error-text" v-if="$v.body.$dirty && !$v.body.required"
          >Body is empty - type something</span
        >
        <span class="error-text" v-if="$v.body.$dirty && !$v.body.minLength"
          >Subtitle don`t be less than 10 symbols, now {{ body.length }}
        </span>
      </div>
      <input
        v-model="imageUrl"
        :class="{ invalid: $v.imageUrl.$dirty && !$v.imageUrl.url }"
        class="app-input post-form__input"
        placeholder="Paste image URL here"
        type="text"
      />
      <div class="validation-text">
        <span class="error-text" v-if="$v.imageUrl.$dirty && !$v.imageUrl.url"
          >Its not URl, try again</span
        >
      </div>
      <button
        @click.prevent="createPost()"
        class="app-button post-form__send-button"
      >
        Create new post
      </button>
      <close-button @click="closeForm()" class="post-form__close"></close-button>
    </form>
  </div>
</template>
<script>
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import AppCard from "../../../UI/app-card/AppCard.vue";
import { required, minLength, maxLength, url } from "vuelidate/lib/validators";
import "./PostForm.scss";
import AddPostButton from "../../../UI/add-post-button/AddPostButton.vue";
import { VueEditor } from "vue2-editor";
import { quillEditor } from 'vue-quill-editor'
import CloseButton from '../../../UI/close-button/CloseButton.vue';
export default {
  components: { AppCard, AddPostButton, VueEditor, quillEditor, CloseButton },
  props:{
        show:{
            type: Boolean,
            default: false
        }
    },
  data: () => ({
    imageUrl: "",
    date: new Date(Date.now()).toString(),
    title: "",
    subtitle: "",
    body: "",
    success: false,
    content: "<h1>Some initial content</h1>",
    editorOption: {
      modules: {
        toolbar:[
          [ 'bold' ,  'italic' ,  'underline' ,  'strike' ],
          [ {  'list' :  'ordered' } , {  'list' :  'bullet'  } ]
        ]
      },
      debug: 'info',
      placeholder: 'Type your post...',
      readOnly: true,
      theme: 'bubble',
      // toolbar:[['bold', 'italic'], ['link', 'image']]
		}
  }),
  mounted() {

  },
  validations: {
    title: { required, minLength: minLength(10), maxLength: maxLength(100) },
    subtitle: { required, minLength: minLength(2), maxLength: maxLength(20) },
    body: { required, minLength: minLength(10) },
    imageUrl: { url },
  },
  methods: {
    async createPost() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        const post = await this.$store.dispatch("addPost", {
          date: this.date,
          title: this.title,
          subtitle: this.subtitle,
          body: this.body,
          imageUrl: this.imageUrl,
        });
        this.$v.$reset();
        this.subtitle = "";
        this.title = "";
        this.body = "";
        this.imageUrl = "";
        this.success = true;
      } catch (e) {}
    },
    closeForm(){
      this.$store.commit('toggleModal') 
      // this.$emit('update:show', false) 
    }
  },
  watch:{
      content(text){
          // console.log(text)
      }
  }
};
</script>
<style>

</style>
