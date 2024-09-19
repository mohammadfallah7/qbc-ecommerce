import { Navigate } from "react-router-dom";

interface Props {
  element: JSX.Element;
  isAuthenticated: boolean;
}

const PrivateRouter = ({ element, isAuthenticated }: Props) => {
  return isAuthenticated ? element : <Navigate to={"/login"} />;
};

export default PrivateRouter;
