import axios from "axios";
import { API_URL } from "common/constants/env";

import i18n from "../../i18n";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers = {
    "Accept-Language": i18n.language,
  };

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    // error here is of type AxiosError

    if (error.response) {
      if (error.response.data) {
        return Promise.reject(error.response.data); // returns data object which is the data send my server so i can dispaly msg that server send to front
      } else {
        return Promise.reject(
          `An error occurred but server didn't send any error data`
        );
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
