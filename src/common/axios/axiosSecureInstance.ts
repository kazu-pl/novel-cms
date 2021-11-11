import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getTokens, saveTokens } from "common/auth/tokens";
import { API_URL } from "common/constants/env";
import axiosInstance from "./axiosInstance";
import { AccessToken } from "types/novel-server.types";
import history from "common/router/history";
import { PATHS_CORE } from "common/constants/paths";

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
          const resWithNewAccessToken = await axiosInstance.post<AccessToken>(
            "/cms/refresh-token",
            {
              refreshToken: tokens.refreshToken,
            }
          );
          const { accessToken } = resWithNewAccessToken.data;
          saveTokens({ ...tokens, accessToken });

          return axiosSecureInstance({
            ...originalConfig,
            data: JSON.parse(originalConfig.data), // originalConfig.data is string but you have to pass object type for axios to stringify it and send to server. If you pass jsut originalConfig without JSON.parse() then axios won't send any body (you will be able to see in browser in requests tab that it sends body, but on server you won't see any body)
          });
        } catch (error) {
          // catch error when obtaining new access token failed
          const axiosError = error as AxiosError;

          history.push(PATHS_CORE.LOGOUT); // TODO: this won't work in react-router 6. You will get pushed to /logout but application won't be pushed to that url. Just url will change
          alert("you were logged out due to ended session");
          // TODO: show snackbar and inform about timed out session as a reason for logging out
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
