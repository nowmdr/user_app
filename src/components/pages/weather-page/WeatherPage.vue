<template>
    <div class="weather">
        <h3 class="title">Weather</h3>
        <form @submit.prevent="fetchWeather()">
            <input 
            type="text" 
            class="app-input" 
            placeholder="Enter the city..."
            v-model="city"
            autocomplete="off">
        </form>
    </div>
</template>
<script>
export default {
    data:() => ({
        city: 'London',
        weather: null
    }),
    methods:{
        async fetchWeather(){
            try {
                const key = process.env.VUE_APP_WEATHER
                const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${key}`)
                this.weather = await res.json()
                console.log(this.weather)
                onsole.log(this.city)
            } catch (e) {
                console.log(e)  
            }
        }
    },
    async mounted(){
        // fetchWeather();
    },
}
</script>