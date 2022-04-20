import axios from "axios";
import { getAuthToken } from "./cookieStorage";

axios.interceptors.request.use((req) => {
  req.headers = {
    ...req.headers,
    Authorization: getAuthToken(),
  };
  return req
});



