import axiosInstance from "./axiosInstance";

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

export const logout = async (navigate) => {
  await axiosInstance.post("/auth/logout");
  localStorage.removeItem("accessToken");
  if (typeof navigate === "function") {
    navigate("/login");
  }
};

export const getUser = () => {
  return axiosInstance.get("/auth/get-user");
};
