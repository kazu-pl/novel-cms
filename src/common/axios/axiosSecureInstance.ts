import axios from "axios";
import { API_URL } from "common/constants/env";

const axiosSecureInstance = axios.create({
  baseURL: API_URL,
});

export default axiosSecureInstance;
