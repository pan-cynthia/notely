import axios from "axios";

import { logout } from "./auth";

import { autoLogout, isTokenValid } from "../utils/authentication";
import { showGlobalToast } from "../utils/toastNotifier";

import { handleError } from "../utils/handleError";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: `${baseURL}/api`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${baseURL}/api/auth/refresh-token`,
      {},
      {
        withCredentials: true,
      }
    );

    const newToken = response.data.accessToken;
    localStorage.setItem("accessToken", newToken);

    const refreshTokenExp = Number(localStorage.getItem("refreshTokenExp"));
    autoLogout(showGlobalToast, refreshTokenExp);

    return newToken;
  } catch (error) {
    // refresh failed, only logout if there is a valid session
    if (localStorage.getItem("refreshTokenExp")) {
      try {
        await logout();
      } catch (err) {
        handleError(err);
      }
    }
    return Promise.reject(error);
  }
};

axiosInstance.interceptors.request.use(async (config) => {
  // don't refresh token on these requests to avoid infinite loop
  if (
    config.url.includes("/login") ||
    config.url.includes("/create-account") ||
    config.url.includes("/refresh-token")
  ) {
    return config;
  }

  let token = localStorage.getItem("accessToken");

  // only refresh access token if expired
  if (!isTokenValid(token)) {
    if (localStorage.getItem("refreshToken")) {
      token = await refreshToken();
    } else {
      return config;
    }
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
