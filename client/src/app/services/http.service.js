import axios from "axios";
// import logger from "./log.servive";
import { toast } from "react-toastify";
import configFile from "../../config";
import localStorageService from "./localStorage.service";
import authService from "./auth.service";

const apiEndPoint =
  process.env.NODE_ENV === "production"
    ? configFile.apiEndPoint
    : configFile.devApiEndPoint;

const http = axios.create({ baseURL: apiEndPoint });

http.interceptors.request.use(
  async function (config) {
    const expiresDate = localStorageService.getTokenExpiresDate();
    const refreshToken = localStorageService.getRefreshToken();
    if (refreshToken && expiresDate < Date.now()) {
      const data = await authService.refresh();
      localStorageService.setTokens({ ...data });
    }

    const accessToken = localStorageService.getAccessToken();
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (res) => {
    res.data = { content: res.data };

    return res;
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedErrors) {
      // logger.log(error);
      console.log(error);
      toast.info("Что то пошло не так. Попробуйте позже");
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};
export default httpService;
