import { Redirect } from "react-router-dom";
import { PATHS_CORE } from "common/constants/paths";
import { getTokens, isAccessTokenExpired } from "common/auth/tokens";
import UserProfileWrapper from "common/wrappers/UserProfileWrapper";

import Route, { RouteProps } from "./Route";

export interface PrivateRouteProps extends RouteProps {}

const PrivateRoute = (props: PrivateRouteProps) => {
  const tokens = getTokens();

  if (!tokens) {
    return <Redirect to={PATHS_CORE.LOGIN} />;
  }

  if (isAccessTokenExpired(tokens.accessToken)) {
    return <Redirect to={PATHS_CORE.LOGIN} />;
  }

  return (
    <UserProfileWrapper>
      <Route {...props} />
    </UserProfileWrapper>
  );
};

export default PrivateRoute;
