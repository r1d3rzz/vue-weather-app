<template>
  <div v-if="weather.main">
    <div
      class="container-fluid vh-100"
      :class="Math.round(weather.main.temp) > 16 ? 'warm' : 'cold'"
    >
      <div class="row justify-content-center">
        <div class="col-lg-5 text-center" style="margin-top: 80px">
          <div
            :class="
              Math.round(weather.main.temp) > 16
                ? 'text-white'
                : 'text-secondary'
            "
          >
            <div>
              <form @submit.prevent="load">
                <input
                  type="search"
                  class="glass_bg"
                  placeholder="Search location here..."
                  id="search"
                  v-model="searchQuery"
                />
              </form>
            </div>

            <div v-if="weather.main && !isError">
              <div id="location" class="fs-1 fw-bold mb-2">
                {{ weather.name }} , {{ weather.sys.country }}
              </div>
              <div id="date" class="fs-4">{{ date }}</div>
              <div id="weatherTemp" class="fs-4 my-3">
                <span class="temp_bg glass_bg"
                  >{{ Math.round(weather.main.temp) }}°C</span
                >
              </div>
              <div id="weatherStatus" class="fs-3">
                {{ weather.weather[0].main }}
              </div>
            </div>
            <div v-else>
              <div class="err_bg glass_bg">
                {{ error }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
import getWeather from "@/composables/getWeather";

export default {
  setup() {
    let api_key = "21b8b66cf98b599f450f30e6844b9863";
    let base_url = "https://api.openweathermap.org/data/2.5/";
    let searchQuery = ref("Yangon");

    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    let date = currentDay + "-" + currentMonth + "-" + currentYear;

    let { error, weather, isError, load } = getWeather(
      searchQuery,
      base_url,
      api_key
    );

    load();

    onMounted(() => {
      load();
    });

    return { searchQuery, weather, load, error, isError, date };
  },
};
</script>
<style scoped>
.warm {
  background: #f12711; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f5af19,
    #f12711
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f5af19,
    #f12711
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.temp_bg {
  display: inline-block;
  text-align: center;
  justify-content: center;
  display: flex;
  align-items: center;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  font-size: 2.5rem;
  padding: 80px 100px;
}

.glass_bg {
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.9px);
  -webkit-backdrop-filter: blur(5.9px);
  border: 1px solid rgba(255, 255, 255, 0.22);
}

#search {
  border: none;
  outline: none;
  padding: 5px 15px;
  font-size: 1.2rem;
  border-radius: 5px;
  margin-bottom: 20px;
  color: white;
}
#search::placeholder {
  color: rgba(255, 255, 255, 0.785);
}

.err_bg {
  width: 300px;
  margin: 0 auto;
  padding: 10px;
  font-size: 1.2rem;
  border-radius: 5px;
}

.cold {
  background: #2980b9; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #ffffff,
    #6dd5fa,
    #2980b9
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #d5d5d5,
    #6dd5fa,
    #2980b9
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
