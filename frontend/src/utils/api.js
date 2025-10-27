import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear user data and redirect to login
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Helper function for fetch requests with auth
export const fetchWithAuth = async (url, options = {}) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (user.token) {
    headers.Authorization = `Bearer ${user.token}`;
  }

  const response = await fetch(`${API_URL}/api${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem("user");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  return response;
};

export default api;
