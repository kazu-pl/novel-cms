import axios from "axios";
import { getTokens, saveTokens } from "common/auth/tokens";
import { API_URL } from "common/constants/env";
import axiosInstance from "./axiosInstance";
import { AccessToken } from "types/novel-server.types";
import history from "common/router/history";
import { PATHS_CORE } from "common/constants/paths";

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
  async (error) => {
    const originalConfig = error.config;
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
          return axiosSecureInstance(originalConfig);
        } catch (err: any) {
          history.push(PATHS_CORE.LOGOUT);
          // TODO: show snackbar and inform about timed out session as a reason for logging out
          if (err.response && err.response.data) {
            return Promise.reject(err.response.data);
          }

          return Promise.reject(err);
        }
      } else {
        return Promise.reject(error.response.data);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosSecureInstance;

// link to website based on which I created this interceptor: https://www.bezkoder.com/axios-interceptors-refresh-token/
