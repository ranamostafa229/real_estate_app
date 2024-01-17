import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location.pathname }} />
  );
};

export default PrivateRoute;
