import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4049",
  headers: { "Content-Type": "application/json" },
});

// Add authorization header to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
