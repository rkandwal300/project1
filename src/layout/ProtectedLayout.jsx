import { Navigate, Outlet } from "react-router";
import { getUser } from "../store/selectors/uiSelector";
import Cookies from "js-cookie";

export default function ProtectedRoute() {
  const jwtToken = Cookies.get("jwt_token");
  // const user = getUser();
  if (!jwtToken) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
