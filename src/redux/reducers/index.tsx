import { combineReducers } from "redux";
import userReducer from "./userReducer";
import homeReducer from "./homeReducer";
import earningReducer from "./earningReducer";
import savingReducer from "./savingReducer";

export default combineReducers({
  user: userReducer,
  home: homeReducer,
  earning: earningReducer,
  saving: savingReducer,
});
