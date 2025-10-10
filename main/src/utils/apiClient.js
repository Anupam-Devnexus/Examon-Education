/**
 *  api.js
 * Centralized Axios instance with:
 *  Dynamic base URL
 *  Request timing & performance measurement
 *  Automatic error logging
 *  Optional monitoring integration
 */

import axios from "axios";

//  Dynamic Base URL (auto-switch between environments)
const API_BASE_URL = "https://api.devnexus.com"; // default production URL

//  Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10s timeout to prevent hanging requests
});

// ======================================================
//   REQUEST INTERCEPTOR — starts timer & attaches token
// ======================================================
api.interceptors.request.use(
  (config) => {
    // Attach timing meta
    config.meta = { startTime: performance.now() };

    //  Attach Auth Token (if available)
    const token = JSON.parse(localStorage.getItem("UserDetails"))?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ======================================================
//  RESPONSE INTERCEPTOR — logs & sends metrics
// ======================================================
api.interceptors.response.use(
  async (response) => {
    const duration = performance.now() - response.config.meta.startTime;

    //  Log timing to console (visible in dev)
    if (import.meta.env.MODE === "development") {
      console.log(`⏱️ ${response.config.url} took ${duration.toFixed(1)} ms`);
    }

    //  Optionally send metrics to your backend for aggregation
    // (You can disable this in production if using external APM)
    try {
      await navigator.sendBeacon?.(
        "/metrics/api",
        JSON.stringify({
          url: response.config.url,
          duration,
          status: response.status,
          timestamp: Date.now(),
        })
      );
    } catch (_) {
      // ignore metric failures silently
    }

    return response;
  },
  async (error) => {
    const duration = performance.now() - (error.config?.meta?.startTime || 0);

    const errorUrl = error.config?.url || "unknown";
    const status = error.response?.status || 0;

    if (import.meta.env.MODE === "development") {
      console.warn(` ${errorUrl} failed after ${duration.toFixed(1)} ms`);
    }

    // Log performance failure (non-blocking)
    try {
      await navigator.sendBeacon?.(
        "/metrics/api",
        JSON.stringify({
          url: errorUrl,
          duration,
          status,
          error: true,
          message: error.message,
          timestamp: Date.now(),
        })
      );
    } catch (_) {}

    return Promise.reject(error);
  }
);

export default api;
