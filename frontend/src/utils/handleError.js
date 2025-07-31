export const handleError = (error, navigate = null) => {
  if (error?.response) {
    console.error("Status: ", error.response.status);
    console.error("Message: ", error.response.data?.message || error.message);

    if (error.response.status === 401) {
      // user not found, log out
      localStorage.clear();
      if (typeof navigate === "function") {
        navigate("/login");
      }
    }
  } else {
    console.error("Something went wrong: ", error.message);
  }
}
