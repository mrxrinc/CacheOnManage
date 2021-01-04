import { HOME_DATA } from "redux/actions/ActionTypes";

const INSTIAL_STATE = {
  homeData: [],
};
export default (state = INSTIAL_STATE, action: any) => {
  switch (action.type) {
    case HOME_DATA:
      return { ...state, homeData: action.payload };
    default:
      return state;
  }
};
