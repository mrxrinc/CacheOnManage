import {
  MOBILETOPUP_PAGE,
  MOBILETOPUP_OPERATORNAME,
  MOBILETOPUP_CHILDPHONE,
} from "./mobileTopUp.constants";

const INSTIAL_STATE = {
  pageName: "MNP",
  operatorName: "",
  childPhone: "",
};
export default (state = INSTIAL_STATE, action: any) => {
  switch (action.type) {
    case MOBILETOPUP_PAGE:
      return { ...state, pageName: action.payload };
    case MOBILETOPUP_OPERATORNAME:
      return { ...state, operatorName: action.payload };
    case MOBILETOPUP_CHILDPHONE:
      return { ...state, childPhone: action.payload };
    default:
      return state;
  }
};
