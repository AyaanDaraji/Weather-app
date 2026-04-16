import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

export const getWeather = (city) => {
  return axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    }
  );
};