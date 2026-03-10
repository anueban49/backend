import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

// Add authorization header to all requests
api.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  const clientToken = localStorage.getItem("accessToken");
  const staffToken = localStorage.getItem("staffAccessToken");
  const token = clientToken || staffToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
