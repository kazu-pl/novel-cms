import { Navigate, useNavigate } from "react-router-dom";
import { PATHS_CORE } from "common/constants/paths";
import { getTokens, isTokenExpired } from "common/auth/tokens";
import UserProfileWrapper from "common/wrappers/UserProfileWrapper";
import useLocalizedPath from "./useLocalizedPath";
import Route, { RouteProps } from "./Route";
import { refreshAccessToken } from "core/store/userSlice";
import { useSnackbar } from "notistack";
import { useState, useLayoutEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { urlFromQuery } from "core/views/Login";
import { useTranslation } from "react-i18next";

export interface PrivateRouteProps extends RouteProps {}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { path } = useLocalizedPath();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const tokens = getTokens();
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  useLayoutEffect(() => {
    const handleRefreshToken = async () => {
      try {
        await refreshAccessToken();
        setIsCheckingAuth(false);
      } catch (err) {
        const from = window.location.href.slice(window.location.origin.length);

        setIsCheckingAuth(false);
        enqueueSnackbar(t("notifications.sessionEnd"), {
          variant: "info",
        });
        navigate(path(PATHS_CORE.LOGIN), {
          state: {
            [urlFromQuery]: from,
          },
        });
      }
    };

    if (
      tokens &&
      isTokenExpired(tokens.accessToken) &&
      !isTokenExpired(tokens.refreshToken)
    ) {
      setIsCheckingAuth(true);
      handleRefreshToken();
    }
  }, [tokens, enqueueSnackbar, navigate, path, t]);

  if (!tokens) {
    const from = window.location.href.slice(window.location.origin.length);
    return (
      <Navigate
        to={path(PATHS_CORE.LOGIN)}
        replace
        state={{
          [urlFromQuery]: from,
        }}
      />
    );
  }

  if (
    isTokenExpired(tokens.refreshToken) &&
    isTokenExpired(tokens.accessToken)
  ) {
    enqueueSnackbar(t("notifications.sessionEnd"), {
      variant: "info",
    });
    const from = window.location.href.slice(window.location.origin.length);
    return (
      <Navigate
        to={path(PATHS_CORE.LOGIN)}
        replace
        state={{
          [urlFromQuery]: from,
        }}
      />
    );
  }

  return isCheckingAuth ? (
    <Box display="flex">
      <CircularProgress />
      <Box ml={2}>
        <Typography>Authorizing...</Typography>
      </Box>
    </Box>
  ) : (
    <UserProfileWrapper>
      <Route {...props} />
    </UserProfileWrapper>
  );
};

export default PrivateRoute;

// OTHER POSSIBLE IMPLEMENTATIONS OF PrivateRoute:
// 1 - THE BEST? use SetInterval to refresh accessToken in the background and here in Private Route check only if tokens exists and if accessToken is valid:
// if (!tokens) {
//   return <Navigate to={path(PATHS_CORE.LOGIN)} replace />;
// }

// if (isTokenExpired(tokens.accessToken)) {
//   return <Navigate to={path(PATHS_CORE.LOGIN)} replace />;
// }

// setInterval can be used in useEffect in some useTokensSession.tsx hook that will be fired in  AuthWrapper.tsx . AuthWrapper can wrap entire App in index.tsx or App.tsx like so:

// <Router history={history}>
//   <AuthWrapper>
//     <App />
//   </AuthWrapper>
// </Router>

// ------------------------------------------------------
// 2 - SECOND THE BEST? current impelmentation: PrivateRoute checks if tokens exists and if they are valid. If they expires it runs an action to refresh tokens and for the time of checking it dispalys loader (it will show when you change routes and the token expired in the meanwhile)

// -----------------------------------------------------
// 3 - check only if tokens axist and if they  are really tokens and not random characters (if token expired you still allow to display PrivateRoute because if any "buisness" request will occur, then axios interceptor will refresh it anyway) (bad security)

// -----------------------------------------------------
// 4 - check if tokens exists and if accessToken is not expirted (if expired, redirect to /login) but the token expiration time is long (bad security). This approach does not necessary need refresh token?

// -----------------------------------------------------
// 5 - almost the same logic as #2 but you don't display spinner for the request pending time which is still better secured than #3 or #4 but as as secured as #1 or #2
