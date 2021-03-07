import axios from "axios";
import * as R from "ramda";
import { AxiosInstance } from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import showNotify from "helpers/notify";
import * as RootNavigation from "navigation/rootNavigation";

interface Config {
  suffix?: string;
  baseURL?: string;
}

/**
 * A HTTP service which created by Axios instance creator
 *
 * @abstract
 */
abstract class BaseAPI {
  protected httpService: AxiosInstance;
  protected constructor({
    suffix,
    //baseURL = process.env.APP_BASE_URL,
    // baseURL = "http://91.245.228.78:8080",
    baseURL = "https://Blujr-api.sdb247.com",
  }: Config) {
    // create a new instance of the Axios with custom config.
    this.httpService = axios.create({
      baseURL: `${baseURL}/${suffix ? `${suffix}/` : ""}`,
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus(status) {
        return status >= 200 && status < 300;
      },
    });

    this.requestInterceptors();
    this.responseInterceptors();
  }

  private responseInterceptors() {
    // Intercept responses before they are handled by then or catch.
    this.httpService.interceptors.response.use(
      (response) => R.pathOr(response, ["data"])(response),
      (error) => {
        const errorMessage = R.path(["response", "data", "message"])(error);
        if (R.pathEq(["response", "status"], 401)(error)) {
          RootNavigation.navigate("login", null);
        }
        if (R.pathEq(["response", "status"], 500)(error)) {
          showNotify({
            data: "خطایی در سرور رخ داده است",
          });
        } else {
          if (errorMessage) {
            showNotify({
              data: errorMessage || "خطایی رخ داده است",
            });
          } else {
            showNotify({
              data: "خطایی در سرور رخ داده است",
              duration: 3000,
            });
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private requestInterceptors() {
    this.httpService.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          config.headers.Authorization = "Bearer " + token;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }
}
export default BaseAPI;
