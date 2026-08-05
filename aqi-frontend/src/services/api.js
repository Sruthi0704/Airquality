import axios from "axios";

const api = axios.create({
  baseURL: "https://airvision-ai-api.onrender.com",
});

export default api;