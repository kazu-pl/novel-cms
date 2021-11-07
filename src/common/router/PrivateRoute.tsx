import { Navigate } from "react-router-dom";
import { PATHS_CORE } from "common/constants/paths";
import { getTokens, isAccessTokenExpired } from "common/auth/tokens";
import UserProfileWrapper from "common/wrappers/UserProfileWrapper";
import useLocalizedPath from "./useLocalizedPath";
import Route, { RouteProps } from "./Route";

export interface PrivateRouteProps extends RouteProps {}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { path } = useLocalizedPath();

  const tokens = getTokens();

  if (!tokens) {
    return <Navigate to={path(PATHS_CORE.LOGIN)} replace />;
  }

  if (isAccessTokenExpired(tokens.accessToken)) {
    return <Navigate to={path(PATHS_CORE.LOGIN)} replace />;
  }

  return (
    <UserProfileWrapper>
      <Route {...props} />
    </UserProfileWrapper>
  );
};

export default PrivateRoute;
