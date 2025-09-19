import axios from "axios";

import axiosInstance from "./axiosInstance";

import { handleError } from "../utils/handleError";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const createAccount = ({ name, email, password }) => {
  return axiosInstance.post("/auth/create-account", {
    name,
    email,
    password,
  });
};

export const login = ({ email, password }) => {
  return axiosInstance.post("/auth/login", {
    email,
    password,
  });
};

export const logout = async (navigate = null, setUserInfo) => {
  try {
    await axios.post(
      `${baseURL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
  } catch (error) {
    handleError(error);
  }

  if (setUserInfo) setUserInfo(null);
  localStorage.clear();

  if (typeof navigate === "function") {
    navigate("/login");
  } else {
    window.location.href = "/login";
  }
};

export const getUser = () => {
  return axiosInstance.get("/auth/get-user");
};
