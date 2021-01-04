import axios from "axios";
import { BASE_URL } from "config";
import { path } from "ramda";

import { ToastAndroid } from "react-native";

// import AuthService from './AuthService' // ... Just a service to refresh auth tokens

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});
// AxiosInstance.defaults.headers.common["Authorization"] =
//   "Bearer " + useSelector((state) => state.user.token);
AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (!error.response) {
      return Promise.reject("Network Error");
    } else if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // return AuthService.getToken()
      //     .then(token => {
      //         const authTokenResponse = path(['data', 'response'], token)
      //   AxiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + authTokenResponse;
      //         originalRequest.headers['Authorization'] = 'Bearer ' + authTokenResponse;
      //         return axios(originalRequest);
      //     })
      //     .catch(err => err)
    } else {
      ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
      return error.response;
    }
  }
);

export default AxiosInstance;
