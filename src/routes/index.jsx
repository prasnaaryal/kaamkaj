import { useRoutes } from "react-router-dom";

// routes
import AuthenticationRoutes from "./AuthenticationRoutes";
import MainRoutes from "./MainRoutes";

export default function ThemeRoutes() {
  return useRoutes([AuthenticationRoutes, MainRoutes]);
}
