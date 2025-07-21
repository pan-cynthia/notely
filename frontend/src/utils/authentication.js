 import { jwtDecode } from 'jwt-decode';

// check if access token is expired or not
export const isTokenValid = (accessToken) => {
  try {
    const decoded = jwtDecode(accessToken);
    const currTime = Date.now() / 1000; // seconds
    console.log("Expiration: ", decoded.exp);
    console.log("Now: ", Date.now());
    return decoded.exp > currTime;
  } catch (error) {
    // token is expired, user needs to login again
    return false;
  }
}
