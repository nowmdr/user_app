<template>
  <div>
    <loader-page v-if="loader"></loader-page>
    <div v-else class="posts-page">
      <app-modal :show.sync="modalVisible">
        <post-form></post-form>
      </app-modal>
      <div class="posts-page__options">
        <div>
          <input
            v-model="sortByTitle"
            @input="searchAllPosts()"
            placeholder="Search by a title..."
            class="app-input"
            type="text"
          />
        </div>
        <add-post-button @click="modalOpen()"></add-post-button>
      </div>
      <div v-if="searchResult" class="posts-page__container">
        <ul class="posts-page__list">
          <li
            v-for="post of paginationArray"
            :key="post.id"
            class="posts-page__item"
          >
            <post-card
              @delete="deletePost(post)"
              @open="postOpen(post)"
              :post="post"
            ></post-card>
          </li>
        </ul>
        <!-- <button @click="date()">Date</button> -->
      </div>
      <div v-else class="posts-page__no-result">
        <span>It seems there is no such post</span>
        <img
          src="https://unsplash.com/a/img/empty-states/photos.png"
          alt="No result"
        />
      </div>
      <div v-if="!sortByTitle" class="post-page__pagination pagination">
        <div
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          class="pagination__page"
          @click="changePage(pageNumber)"
          :class="{ 'current-page': page === pageNumber }"
        >
          {{ pageNumber }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import AddPostButton from "../../../UI/add-post-button/AddPostButton.vue";
import AppCard from "../../../UI/app-card/AppCard.vue";
import AppModal from "../../../UI/app-modal/AppModal.vue";
import DeleteButton from "../../../UI/delete-buttion/DeleteButton.vue";
import RefreshButton from "../../../UI/refresh-button/refreshButton.vue";
import LoaderPage from "../../loader-page/LoaderPage.vue";
import PostCard from "../post-card/PostCard.vue";
import PostForm from "../post-form/PostForm.vue";
import "./PostsPage.scss";
export default {
  components: {
    AppCard,
    DeleteButton,
    AddPostButton,
    RefreshButton,
    AppModal,
    PostForm,
    LoaderPage,
    PostCard,
  },
  computed: {
    getPosts() {
      return this.$store.getters.posts;
    },
  },
  data: () => ({
    searchResult: true,
    url: "",
    copyPosts: null,
    searchedPosts: null,
    filterCopyPosts: "",
    paginationArray: null,
    modalVisible: false,
    sortByTitle: "",
    page: 1,
    limit: 6,
    totalPages: 0,
    loader: true,
  }),
  async mounted() {
    await this.fetchPosts();
    console.log(this.searchedPosts);
    this.loader = false;
  },
  methods: {
    setupPagination(posts) {
      const tempArray = _.chunk(posts, this.limit);
      // this.totalPages = Math.ceil(this.searchedPosts.length / this.limit)
      this.totalPages = _.size(tempArray);
      this.paginationArray = tempArray[this.page - 1] || tempArray[0];
      console.log(this.paginationArray);
    },
    changePage(pageNumber) {
      this.page = pageNumber;
    },
    async fetchPosts() {
      if (this.$route.query.page) {
        this.page = +this.$route.query.page;
      }
      this.copyPosts = await this.$store.dispatch("getPosts");
      this.searchedPosts = await this.$store.dispatch("fetchNativePosts");
      // this.searchedPosts = this.copyPosts
      if (this.copyPosts) {
        this.searchedPosts = this.copyPosts.concat(this.searchedPosts);
      }
      this.$store.commit("setPosts", this.searchedPosts);
      console.log(this.searchedPosts);
      this.setupPagination(this.searchedPosts);
    },
    async deletePost(post) {
      console.log(post);
      // this.copyPosts = this.copyPosts.filter(p => p.id !== post.id)
      // console.log(this.copyPosts)
      // await this.$store.dispatch('updatePosts', this.copyPosts)
      await this.$store.dispatch("deletePost", post.id);
      // this.copyPosts = await this.$store.dispatch('getPosts')
      this.fetchPosts();
    },
    modalOpen() {
      this.modalVisible = true;
    },
    postOpen(post) {
      // console.log(post)
      this.$router.push(`/posts/${post.id}`);
    },
    searchAllPosts() {
      if (this.searchedPosts) {
        const regular = new RegExp(`${this.sortByTitle}`, `gi`);
        const arr = this.searchedPosts.filter((post) => {
          // return post.title.toLowerCase().includes(this.sortByTitle) || post.body.toLowerCase().includes(this.sortByTitle)
          return post.title.match(regular) || post.body.match(regular);
        });
        if (arr.length < 1) {
          // this.$popupWarning('No result')
          this.setupPagination(this.searchedPosts);
          this.searchResult = false;
        } else {
          this.searchResult = true;
          this.paginationArray = arr;
        }
      }
    },
  },
  watch: {
    page: function () {
      if (this.page) {
        this.setupPagination(this.searchedPosts);
        this.$router
          .push(`${this.$route.path}?page=${this.page}`)
          .catch(() => {});
      }
    },
    modalVisible: async function () {
      if (!this.modalVisible) {
        await this.fetchPosts();
      }
    },
  },
};
</script>
