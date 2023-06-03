import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

export const AuthorizeUser = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }

  return children;
};

export const ProtectRoutePassword = ({ children }) => {
  const username = useAuthStore((state) => state.auth.username);

  if (!username) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }

  return children;
};
