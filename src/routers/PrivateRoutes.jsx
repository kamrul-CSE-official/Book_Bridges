import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useUserInfo from "../Utils/UserInfo";

export default function PrivateRoute({ children }) {
  const { user, isLoading } = useUserInfo();

  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <span>Loading....</span>{" "}
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login"></Navigate>;
}
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
