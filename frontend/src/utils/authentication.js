import { jwtDecode } from "jwt-decode";

// get token expiration time
export const getTokenExp = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000;
  } catch {
    return null;
  }
};
