import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./Contextprovider";
import Spinner from "../../utils/Spinner";
import Verifyacount from "./Verifyacount";

const Privateroute = ({ children }) => {
  const location = useLocation();
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (user && !user?.emailverified) {
    return <Verifyacount></Verifyacount>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default Privateroute;
