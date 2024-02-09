import { ref } from "vue";

let getWeather = (searchQuery, base_url, api_key) => {
  let error = ref(null);
  let weather = ref({});
  let isError = ref(false);

  let load = async () => {
    try {
      let res = await fetch(
        `${base_url}weather?q=${searchQuery.value.toLowerCase()}&units=metric&appid=${api_key}`
      );
      if (res.status === 404) {
        isError.value = true;
        throw new Error("city not found");
      } else if (res.status === 400) {
        isError.value = true;
        throw new Error("Nothing to geocode");
      }

      isError.value = false;
      let data = await res.json();
      weather.value = data;
    } catch (err) {
      error.value = err.message;
      console.log(err);
    }
  };

  return { error, weather, isError, load };
};

export default getWeather;
