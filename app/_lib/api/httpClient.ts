import axios from "axios";

/* Shared browser-side client for this site's Route Handlers. */
export const httpClient = axios.create({
  baseURL: "/api",
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});
