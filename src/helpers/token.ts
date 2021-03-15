import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../customType";
//import UserActions from "../store/User/user.actions";
import AsyncStorage from "@react-native-community/async-storage";

export const readToken = async () => {
  await AsyncStorage.getItem("token").then((token) => {
    if (token === "null") {
      return null;
    } else {
      return token;
    }
  });
};

export const removeToken: ReturnType<any> = () => {
  const dispatch = useDispatch();
  //dispatch(UserActions.logout([], { sagas: true }));
};
