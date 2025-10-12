import { Navigate, Outlet } from "react-router";
import Cookies from "js-cookie";

function PublicLayout() {
  const jwtToken = Cookies.get("jwt_token");
  // const user = getUser();

  if (jwtToken) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default PublicLayout;
