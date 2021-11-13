import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getTokens } from "common/auth/tokens";
import { API_URL } from "common/constants/env";
// import history from "common/router/history";
import { PATHS_CORE } from "common/constants/paths";
import { refreshAccessToken } from "core/store/userSlice";
import { urlLogoutReasonQuery, urlFromQuery } from "core/views/Login";

interface ExtendedAxiosConfig extends AxiosRequestConfig {
  _retry: boolean;
}

const axiosSecureInstance = axios.create({
  baseURL: API_URL,
});

axiosSecureInstance.interceptors.request.use((config) => {
  const tokens = getTokens();

  config.headers = {
    Authorization: `Bearer ${tokens && tokens.accessToken}`,
  };

  return config;
});

axiosSecureInstance.interceptors.response.use(
  (response) => response,
  async (err) => {
    const error = err as AxiosError;
    const originalConfig = error.config as ExtendedAxiosConfig;

    if (error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        const tokens = getTokens();

        if (!tokens) {
          return axiosSecureInstance(originalConfig);
        }

        try {
          await refreshAccessToken();

          return axiosSecureInstance({
            ...originalConfig,
            data: JSON.parse(originalConfig.data), // originalConfig.data is string but you have to pass object type for axios to stringify it and send to server. If you pass jsut originalConfig without JSON.parse() then axios won't send any body (you will be able to see in browser in requests tab that it sends body, but on server you won't see any body)
          });
        } catch (error) {
          // catch error when obtaining new access token failed
          const axiosError = error as AxiosError;
          const from = window.location.href.slice(
            window.location.origin.length
          );
          window.location.href = `${PATHS_CORE.LOGOUT}?${urlLogoutReasonQuery.key}=${urlLogoutReasonQuery.value}&${urlFromQuery}=${from}`;
          // history.push(PATHS_CORE.LOGOUT); // TODO: this won't work in react-router 6. You will get pushed to /logout but application won't be pushed to that url. Just url will change. Instead, use  window.location.href which will reload application

          // alert("you were logged out due to ended session");
          //  to show snackbar you would need to to: history.push(`${PATHS_CORE.LOGOUT}?reason=refresh-token_expired`); and then the same logic in Logout and Login components
          if (axiosError.response && axiosError.response.data) {
            return Promise.reject(axiosError.response.data);
          }

          return Promise.reject(axiosError);
        }
      } else {
        return Promise.reject(error.response.data);
      }
    }

    return Promise.reject(err);
  }
);

export default axiosSecureInstance;

// link to website based on which I created this interceptor: https://www.bezkoder.com/axios-interceptors-refresh-token/

// ----------------------------------------------------

// ################## ISSUE with react-router-dom v6 in axios interceptor ###########################
// Axios Incerceptor:
// its not possible to clone history.push() in axios interceptor like it was done in  react-router-5. The only possibility is to window.location.href = `${PATHS_CORE.LOGOUT}?reason=session_expired`;
//
// if you use history.push() you will be able to change url but application won't change its UI
//
// using window.location.href will behave like so:
// 1 - you are visiting some PrivateRoute, after refreshToken expirted you yry to update e.g. your avatar
// 2 - update avatar request will return 401 (if accessToken expired) or 403 (if refreshToken expired),
// 3 - axios interceptor will try to refresh accessToken (if avatar request returned 401) but t will get 403 because refreshToken too expired already. That error will be catched in component view function (NOT in PrivateRoute or Redux) and that component will dispaly snackbar with "forbiden - refresh token expired. Log in again"
// 4 - that snackbar will be visible only for a second (even less that 0.5s) because right after that window.location.href from axios interceptor will occur, page will be refreshed completely on /login (user will load website again for /login url)
// 5 - whole app will be downloaded again, logout request from /logout will be sent and you will be redirected to /login. (In /logout you can search for url query e.g. ?reason=refreshtokenexpired and you when redirecting to /login you can pass state object to /login page with that reason so /login page will display snackbar informig  that you were logged out because your session ended (it will be second snackbar)

// Possible solvings (for that snackbar visible for a second):
// #1 - move notistack to REDUX and in every redux action use try/catch  to check if in catch if your refreshToken expired so you won't dispatch action for showing notistack (in try you can dispatch notistack action for success action)
// that way, 1st snackbar won't show but your page will reload anyway

//  OR:

// #2 - not displaying any message from server but creating then in front components? and check if your refresh token got expired in every catch in every component that sends any requests
