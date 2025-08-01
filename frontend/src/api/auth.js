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

export const logout = async (navigate = null) => {
  await axiosInstance.post("/auth/logout");
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
