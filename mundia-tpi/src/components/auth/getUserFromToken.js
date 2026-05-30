import { jwtDecode } from "jwt-decode";
import { isTokenValid } from "./auth.helpers";

export const getUserFromToken = (token) => {
  if (!isTokenValid(token)) {
    return null;
  }

  try {
    const decoded = jwtDecode(token);

    return decoded.id_users;
    
  } catch (error) {
    return null;
  }
};
