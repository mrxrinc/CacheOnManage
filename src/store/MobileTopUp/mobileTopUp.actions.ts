import {
  MOBILETOPUP_PAGE,
  MOBILETOPUP_OPERATORNAME,
  MOBILETOPUP_CHILDPHONE,
} from "./mobileTopUp.constants";

// mobile topUp
export const mobileTopUpPageName = (pageName: any) => {
  return {
    type: MOBILETOPUP_PAGE,
    payload: pageName,
  };
};
export const mobileTopUpOperatorName = (operatorName: any) => {
  return {
    type: MOBILETOPUP_OPERATORNAME,
    payload: operatorName,
  };
};

export const childPhoneNumber = (childPhone: any) => {
  return {
    type: MOBILETOPUP_CHILDPHONE,
    payload: childPhone,
  };
};
