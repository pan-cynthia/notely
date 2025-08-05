import { jwtDecode } from "jwt-decode";

import { logout } from "../api/auth";

// get token expiration time
export const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currTime = Date.now() / 1000;
    return decoded.exp > currTime;
  } catch {
    return false;
  }
};

let logoutTimer;

// logout user if refresh token is about to expire
export const autoLogout = async (handleShowToast, refreshTokenExp) => {
  if (logoutTimer) clearTimeout(logoutTimer);

  const bufferTime = 5 * 1000; // 5 seconds before actual expiration
  const currTime = Date.now();
  const logoutTime = refreshTokenExp - currTime - bufferTime;

  if (logoutTime > 0) {
    logoutTimer = setTimeout(() => {
      handleShowToast("logout", "You're about to be logged out.");
      setTimeout(async () => {
        await logout();
      }, bufferTime);
    }, logoutTime);
  } else {
    await logout();
  }
};
