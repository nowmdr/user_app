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
            placeholder="Search..."
            class="app-input"
            type="text"
          />
        </div>
        <app-select
          class="input-select"
          :modelValue.sync="selectedSort"
          :options="sortOptions"
        ></app-select>
        <add-post-button @click="modalOpen"></add-post-button>
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
import AppSelect from "../../../UI/app-select/AppSelect.vue";
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
    AppSelect,
  },
  computed: {
    getPosts() {
      return this.$store.getters.posts;
    },
    sortPost() {
      return [...this.searchedPosts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      );
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
    selectedSort: "",
    sortOptions: [
      { value: "none", name: "No sorted" },
      { value: "title", name: "Sort by title" },
      { value: "body", name: "Sort by body" },
    ],
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
      this.$store.commit('toggleModal') 
      // this.modalVisible = true;
    },
    postOpen(post) {
      this.$router.push(`/posts/${post.id}`);
    },
    searchAllPosts() {
      if (this.sortByTitle) {
        if (this.searchedPosts) {
          const regular = new RegExp(`${this.sortByTitle}`, `gi`);
          const arr = this.searchedPosts.filter((post) => {
            // return post.title.toLowerCase().includes(this.sortByTitle) || post.body.toLowerCase().includes(this.sortByTitle)
            return post.title.match(regular) || post.body.match(regular);
          });
          if (arr.length < 1) {
            this.setupPagination(this.searchedPosts);
            this.searchResult = false;
          } else {
            this.searchResult = true;
            this.paginationArray = arr;
          }
        }
      } else {
        this.setupPagination(this.searchedPosts);
      }
    },
  },
  computed:{
    showModal(){
      return this.$store.getters.showModal
    }
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
    showModal: async function () {
      if (!this.showModal) {
        await this.fetchPosts();
      }
    },
    selectedSort(newValue) {
      if (this.searchedPosts) {
        if (this.selectedSort == "none") {
          this.setupPagination(this.searchedPosts);
        } else {
          const arr = this.searchedPosts.sort((post1, post2) =>
            post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
          );
          this.paginationArray = arr;
        }
      }
    },
  },
};
</script>
