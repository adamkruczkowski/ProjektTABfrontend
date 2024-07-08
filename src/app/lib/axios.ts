import axios from "axios";

const MyAxios = axios.create({
  baseURL: "http://localhost:5041/",
});

export default MyAxios;
