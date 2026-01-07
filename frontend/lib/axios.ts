import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4049",
  headers: { "Content-Type": "application/json" },
});
