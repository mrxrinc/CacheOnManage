import AxiosInstance from "./Interceptor"; // ... Your Interceptor path
export const LoginTest = (data: any) => {
  AxiosInstance.post("/api/v1/users/login", data, {
    headers: {
      authorization: null,
    },
  }).catch(() => {
    return false;
  }); // Either handle the error here or in the sagas
};
