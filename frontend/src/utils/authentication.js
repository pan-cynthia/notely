import { jwtDecode } from "jwt-decode";

import { logout } from "../api/auth";

// get token expiration time
export const getTokenExp = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000;
  } catch {
    return null;
  }
};

let logoutTimer;

// logout user if access token or refresh token is about to expire
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
