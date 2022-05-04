import axios from "axios";
import { getAuthToken } from "./cookieStorage";

export const setUpInterceptor = () => {
  axios.interceptors.request.use((req) => {
    req.headers = {
      ...req.headers,
      Authorization: getAuthToken(),
    };
    return req;
  });
};
