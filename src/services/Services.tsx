import AxiosInstance from "./Interceptor"; // ... Your Interceptor path
export const LoginTest = (data) => {
  console.log("LoginTest>> LoginTest data is", data);
  AxiosInstance.post("/api/v1/users/login", data, {
    headers: {
      authorization: null,
    },
  }).catch((error) => console.log("services>> error is", error)); // Either handle the error here or in the sagas
};
