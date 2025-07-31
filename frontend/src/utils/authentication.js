import { jwtDecode } from "jwt-decode";

// check if access token is expired or not
export const isTokenValid = (accessToken) => {
  try {
    const decoded = jwtDecode(accessToken);
    const currTime = Date.now() / 1000;
    return decoded.exp > currTime;
  } catch {
    return false;
  }
};
