<template>
  <div>
    <loader-page v-if="loader"></loader-page>
    <div v-else class="home">
      <app-modal :show.sync="modalVisible">
        <post-form :show.sync="modalVisible"></post-form>
      </app-modal>
      <h3 class="title">
        <span>Hello {{ name }}</span
        ><br />it is your profile info
      </h3>
      <div class="user">
        <app-card>
          <form class="user-form">
            <div class="user-form__photo">
              <img
                v-if="photoUrl"
                :src="`${photoUrl}`"
                onerror="this.src='https://media.istockphoto.com/vectors/fi/avatar-profiilin-oletuskuvakkeen-vektori-id1337144146?b=1&k=20&m=1337144146&s=170667a&w=0&h=ys-RUZbXzQ-FQdLstHeWshI4ViJuEhyEa4AzQNQ0rFI='"
              />
              <img
                v-else
                src="https://media.istockphoto.com/vectors/fi/avatar-profiilin-oletuskuvakkeen-vektori-id1337144146?b=1&k=20&m=1337144146&s=170667a&w=0&h=ys-RUZbXzQ-FQdLstHeWshI4ViJuEhyEa4AzQNQ0rFI="
                alt=""
              />
            </div>
            <label :class="{'edit-label': !inputDisabled}" class="user-form__input"
              ><p>Name:</p>
              <span v-if="inputDisabled">{{name}}</span>
              <input
                v-else
                :class="{ edit: !inputDisabled }"
                type="text"
                v-model="name"
                placeholder="Enter you name..."
                :disabled="inputDisabled"
              />
              <span
                class="error-text"
                v-if="$v.name.$dirty && !$v.name.required"
                >Name field is empty</span
              >
            </label>
            <label :class="{'edit-label': !inputDisabled}" class="user-form__input">
              <p>Date of birth:</p>
              <span v-if="inputDisabled">{{ dateOfBirth | date("date") }}</span>
              <input
                v-else
                :class="{ edit: !inputDisabled }"
                type="date"
                :disabled="inputDisabled"
                v-model="dateOfBirth"
              />
            </label>
            <label :class="{'edit-label': !inputDisabled}" class="user-form__input"
              >Gender:
              <span v-if="inputDisabled">{{ gender }}</span>
              <select
                :class="{ 'main-black': copyInfo.gender, edit: !inputDisabled }"
                class="input-select"
                name="gender"
                v-model="gender"
                :disabled="inputDisabled"
                v-else
              >
                <option disabled value="">Select your gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </label>
            <label :class="{'edit-label': !inputDisabled}" class="user-form__input"
              ><p>City:</p> 
              <span v-if="inputDisabled">{{city}}</span>
              <input
                v-else
                :class="{ edit: !inputDisabled }"
                type="text"
                :disabled="inputDisabled"
                placeholder="Enter your city..."
                v-model="city"
              />
              <span
                class="error-text"
                v-if="$v.city.$dirty && !$v.city.required"
                >City field is empty</span
              >
            </label>
            <label :class="{'edit-label': !inputDisabled}" class="user-form__input"
              ><p>Weather city:</p>  
              <span v-if="inputDisabled">{{cityOfWeather}}</span>
              <input
                v-else
                :class="{ edit: !inputDisabled }"
                type="text"
                :disabled="inputDisabled"
                placeholder="Type here city of weather"
                v-model="cityOfWeather"
              />
              <span
                class="error-text"
                v-if="$v.city.$dirty && !$v.city.required"
                >City field is empty</span
              >
            </label>
            <label :class="{'edit-label': !inputDisabled}" v-if="!inputDisabled" class="user-form__input"
              >Photo URL:
              <clear-button @click="clearUrl" class="delete-btn"></clear-button>
              <input
                type="text"
                :disabled="inputDisabled"
                placeholder="Paste here your photo URL"
                :class="{
                  invalid: $v.photoUrl.$dirty && !$v.photoUrl.url,
                  edit: !inputDisabled,
                }"
                class="photo-input"
                v-model="photoUrl"
              /><br />
              <span
                class="error-text"
                v-if="$v.photoUrl.$dirty && !$v.photoUrl.url"
                >sorry it is not url</span
              >
            </label>
            <a
              class="app-link user-form__link"
              v-if="inputDisabled"
              @click.prevent="inputDisabled = false"
              >Edit data</a
            >
            <div class="user-btns-wrapper" v-else>
              <button
                class="app-button user-form__button"
                @click.prevent="uploadData()"
              >
                Save
              </button>
              <a
              class="app-link user-form__link"
              @click.prevent="getInfo"
              >Back</a
            >
            </div>

            <div v-if="inputDisabled" class="user-form__post-button">
              <add-post-button
                class="post-button"
                @click="modalOpen()"
              ></add-post-button>
            </div>
          </form>
        </app-card>
        <!-- <button class="app-button" @click="success()">Push Success</button>
                <button class="app-button" @click="warning()">Push Warning</button>
                <button class="app-button" @click="error()">Push Error</button>
                <button class="app-button" @click="info()">Push Info</button> -->
      </div>
    </div>
  </div>
</template>
<script>
import "./HomePage.scss";
import { required, minLength, url } from "vuelidate/lib/validators";
//components
import AppCard from "../../UI/app-card/AppCard.vue";
import LoaderPage from "../loader-page/LoaderPage.vue";
import AddPostButton from "../../UI/add-post-button/AddPostButton.vue";
import AppModal from "../../UI/app-modal/AppModal.vue";
import PostForm from "../post-components/post-form/PostForm.vue";
import AppPopup from "../../UI/app-popup/AppPopup.vue";
import { VueEditor } from "vue2-editor";
import ClearButton from "../../UI/clear-button/ClearButton.vue";
export default {
  components: {
    AppCard,
    LoaderPage,
    AddPostButton,
    AppModal,
    PostForm,
    AppPopup,
    VueEditor,
    ClearButton,
  },
  data: () => ({
    loader: true,
    inputDisabled: true,
    modalVisible: false,
    copyInfo: null,
    name: "",
    city: "",
    cityOfWeather: "",
    dateOfBirth: "",
    gender: "",
    photoUrl: "",
  }),
  validations: {
    name: { required },
    city: { required },
    gender: { required },
    photoUrl: { url },
  },
  async mounted() {
    await this.getInfo();
    this.loader = false;
  },
  computed: {
    // getInfo(){
    //     return this.$store.getters.info
    // },
  },
  methods: {
    clearUrl() {
      this.photoUrl = "";
    },
    async getInfo() {
      if (!Object.keys(this.$store.getters.info).length) {
        this.copyInfo = await this.$store.dispatch("fetchInfo");
      } else {
        this.copyInfo = this.$store.getters.info;
      }
      this.inputDisabled = true;

      this.name = this.copyInfo.name;
      this.city = this.copyInfo.city;
      this.gender = this.copyInfo.gender;
      this.cityOfWeather = this.copyInfo.cityOfWeather;
      this.dateOfBirth = this.copyInfo.dateOfBirth;
      this.photoUrl = this.copyInfo.photoUrl;
    },
    modalOpen() {
      this.$store.commit('toggleModal') 
      // this.modalVisible = true;
    },
    async uploadData() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        name: this.name,
        dateOfBirth: this.dateOfBirth,
        city: this.city,
        gender: this.gender,
        cityOfWeather: this.cityOfWeather,
        photoUrl: this.photoUrl,
      };
      this.inputDisabled = true;
      await this.$store.dispatch("updateInfo", formData);
      await this.$store.dispatch("fetchInfo");
      this.copyInfo = Object.assign({}, this.getInfo);
      this.$popupSuccess("Your data has been successfully updated");
    },
  },
};
</script>
