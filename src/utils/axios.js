import axios from "axios";

const token = localStorage.getItem("auth_token");

const API = axios.create({
  baseURL: "https://mern-auth-i408.onrender.com/api",
});

API.interceptors.request.use(
  async (config) => {
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// https://mern-auth-i408.onrender.com/api

// http://localhost:5000/api
export default API;
