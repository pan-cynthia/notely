export const handleError = (error, navigate = null) => {
  if (error?.response) {
    console.error("Status: ", error.response.status);
    console.error("Message: ", error.response.data?.message || error.message);

    // user not found, log out
    if (error.response.status === 401) {
      localStorage.clear();
      if (typeof navigate === "function") {
        navigate("/login");
      }
    }
  } else {
    console.error("Something went wrong: ", error.message);
  }
};
