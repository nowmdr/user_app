<template>
  <div>
    <loader-page v-if="loader"></loader-page>
    <div v-else class="weather">
      <h3 class="title">Weather</h3>
      <app-card class="weather__card card">
        <h3 class="card__title">
          {{ weather.cityName }} / {{ weather.country }}
        </h3>
        <div class="card__body">
          <span>{{ weather.temperature }}°C</span>
          <p>{{ weather.description }}</p>
        </div>
        <form class="card__form" @submit.prevent="fetchWeather()">
          <input
            type="text"
            class="app-input"
            placeholder="Enter the city..."
            v-model="city"
            autocomplete="off"
          />
        </form>
      </app-card>
    </div>
  </div>
</template>
<script>
import "./WeatherPage.scss";
import axios from "axios";
import AppCard from "../../UI/app-card/AppCard.vue";
import LoaderPage from "../loader-page/LoaderPage.vue";
import messages from "../../../utils/messages";
export default {
  components: { AppCard, LoaderPage },

  data: () => ({
    loader: true,
    city: "",
    cityFound: false,
    // visible: false,
    // stormy: false,
    // cloudy: false,
    // clearSky: false,
    // clearNight: false,
    // snowy: false,
    isDay: true,
    citySearch: "",
    weather: {
      cityName: "Gwarinpa",
      country: "NG",
      temperature: 12,
      description: "Clouds everywhere",
      lowTemp: "19",
      highTemp: "30",
      feelsLike: "20",
      humidity: "55",
    },
  }),
  computed: {
    getCity() {
      return this.$store.getters.info.cityOfWeather;
    },
  },
  methods: {
    kelvinToCelsius(kelvin) {
      return kelvin - 273.15;
    },
    async fetchWeather() {
      try {
        const key = process.env.VUE_APP_WEATHER;
        const data = (
          await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?q=${
              this.city ? this.city : this.getCity
            }&appid=${key}`
          )
        ).data;
        this.city = "";
        this.weather.cityName = data.name;
        this.weather.country = data.sys.country;
        this.weather.temperature = this.kelvinToCelsius(data.main.temp).toFixed(
          0
        );
        this.weather.description = data.weather[0].description;
        // this.weather.lowTemp = Math.round(data.main.temp_min);
        // this.weather.highTemp = Math.round(data.main.temp_max);
        // this.weather.feelsLike = Math.round(data.main.feels_like);
        // this.weather.humidity = Math.round(data.main.humidity);
        // const timeOfDay = data.weather[0].icon;
        this.cityFound = false;
      } catch (e) {
        console.log(e.message);
        this.cityFound = true;
        this.$popupError(messages[e.message]);
      }
    },
  },
  mounted() {
    this.fetchWeather();
    this.loader = false;
  },
};
</script>
