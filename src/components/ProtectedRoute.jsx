import { Navigate } from "react-router-dom";
import { localStorageConstants } from "../constants/localStorage.constant";
import { ROUTE_PATHS } from "../constants/apiEndpoints";

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = sessionStorage.getItem(localStorageConstants.ACCESS_TOKEN);
  const role = sessionStorage.getItem(localStorageConstants.USER_ROLE);

  if (!token) {
    return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={ROUTE_PATHS.ERROR_404} replace />;
  }

  return children;
};