import { EARNING_DATA } from "redux/actions/ActionTypes";

const INSTIAL_STATE = {
  earningData: "",
};
export default (state = INSTIAL_STATE, action: any) => {
  switch (action.type) {
    case EARNING_DATA:
      return { ...state, earningData: action.payload };
    default:
      return state;
  }
};
