import { Navigate } from "react-router-dom";
import { PATHS_CORE } from "common/constants/paths";
import { useAppDispatch } from "common/store/hooks";
import { useLayoutEffect, useCallback } from "react";
import { logout } from "core/store/userSlice";
import { getTokens } from "common/auth/tokens";
import useLocalizedPath from "common/router/useLocalizedPath";

const Logout = () => {
  const dispatch = useAppDispatch();
  const { path } = useLocalizedPath();

  const logoutUser = useCallback(async () => {
    getTokens() && (await dispatch(logout())); // if you are on a tab A, and you logout on tab B then tab B would send to server access token to blacklsit it and then remove tokens from LS, so tab A would send request without any tokens which would cause an error
  }, [dispatch]);

  useLayoutEffect(() => {
    logoutUser();
  }, [logoutUser]);

  return <Navigate to={path(PATHS_CORE.LOGIN)} replace />;
};

export default Logout;
