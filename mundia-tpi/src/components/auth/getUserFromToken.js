import { jwtDecode } from "jwt-decode";
import { isTokenValid } from "./auth.helpers";

export const getUserFromToken = (token) => {
  if (!isTokenValid(token)) {
    return null;
  }

  try {
    const decoded = jwtDecode(token);

    return {
      id_users: decoded.id_users,
      id_agents: decoded.id_agents,
      name: decoded.name || decoded.userName || "Usuario",
      rol: decoded.rol?.name || decoded.rol || "Client"
    }
  } catch (error) {
    return null;
  }
};
