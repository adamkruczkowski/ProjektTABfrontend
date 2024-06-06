import axios from "axios";

const MyAxios = axios.create({
  baseURL: "https://localhost:7171/",
});

export default MyAxios;
