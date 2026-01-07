import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4049/",
  headers: { "Context-Type": "Application/json" },
});
