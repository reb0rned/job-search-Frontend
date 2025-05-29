import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsearch.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": "7193266ac3msh8f159bed7d6c9d7p1c64cfjsn4bbcc39b960d",
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  },
});

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);
