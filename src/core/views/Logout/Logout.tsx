import { Navigate, useLocation } from "react-router-dom";
import { PATHS_CORE } from "common/constants/paths";
import { useAppDispatch } from "common/store/hooks";
import { useLayoutEffect, useCallback } from "react";
import { logout } from "core/store/userSlice";
import { getTokens } from "common/auth/tokens";
import useLocalizedPath from "common/router/useLocalizedPath";
import { urlLogoutReasonQuery, urlFromQuery } from "core/views/Login";
import getSearchParamsFromUrl from "common/router/getSearchParamsFromUrl";

const Logout = () => {
  const dispatch = useAppDispatch();
  const { path } = useLocalizedPath();
  const { search } = useLocation();

  const searchParams =
    getSearchParamsFromUrl<{ [key: string]: string }>(search);

  const logoutUser = useCallback(async () => {
    getTokens() && (await dispatch(logout())); // if you are on a tab A, and you logout on tab B then tab B would send to server access token to blacklsit it and then remove tokens from LS, so tab A would send request without any tokens which would cause an error
  }, [dispatch]);

  useLayoutEffect(() => {
    logoutUser();
  }, [logoutUser]);

  return (
    <Navigate
      to={path(PATHS_CORE.LOGIN)}
      replace
      state={{
        // if axios interceptor redirected to /logout with reason query in url then pass it to /login so /login can display notify
        ...(searchParams[urlLogoutReasonQuery.key] && {
          [urlLogoutReasonQuery.key]: searchParams[urlLogoutReasonQuery.key],
        }),
        // pass path from which user was logged out so /login page can redirect to that page after successful login
        ...(searchParams[urlFromQuery] && {
          [urlFromQuery]: searchParams[urlFromQuery],
        }),
      }}
    />
  );
};

export default Logout;
