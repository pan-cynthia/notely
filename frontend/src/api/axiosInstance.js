import axios from "axios";

import { logout } from "./auth";

import { isTokenValid } from "../utils/authentication";

const axiosInstance = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  // don't refresh token on these requests to avoid infinite loop
  if (
    config.url.includes("/login") ||
    config.url.includes("/create-account") ||
    config.url.includes("/refresh-token")
  ) {
    return config;
  }

  const token = localStorage.getItem("accessToken");

  // only refresh access token if expired
  if (!isTokenValid(token)) {
    try {
      const response = await axios.post(
        "/api/auth/refresh-token",
        {},
        {
          withCredentials: true,
        }
      );

      const newToken = response.data.accessToken;
      localStorage.setItem("accessToken", newToken);
      config.headers.Authorization = `Bearer ${newToken}`;
      return config;
    } catch (error) {
      await logout();
      return Promise.reject(error);
    }
  } else {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
});

export default axiosInstance;
