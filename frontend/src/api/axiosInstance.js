import axios from "axios";

import { logout } from "./auth";

import { autoLogout, getTokenExp } from "../utils/authentication";
import { showGlobalToast } from "../utils/toastNotifier";

import { handleError } from "../utils/handleError";

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
  if (getTokenExp(token) < Date.now()) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/refresh-token",
        {},
        {
          withCredentials: true,
        }
      );

      const newToken = response.data.accessToken;
      localStorage.setItem("accessToken", newToken);
      const refreshTokenExp = localStorage.getItem("refreshTokenExp");

      autoLogout(showGlobalToast, refreshTokenExp);
      config.headers.Authorization = `Bearer ${newToken}`;
      return config;
    } catch (error) {
      try {
        await logout();
      } catch (err) {
        handleError(err);
      }
      return Promise.reject(error);
    }
  } else {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
});

export default axiosInstance;
