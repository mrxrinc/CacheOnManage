import {
  QUICKACCESS_OPERATORNAME,
  QUICKACCESS_CHILDPHONE,
  SAGAS_BILLPAYMNET,
  BILLPAYMENT,
  QUICKACCESS_MOBILETOPUP,
  QUICKACCESS_SAGAS_MOBILETOPUP,
} from "./quickAccess.constants";
import { QUICKACCESS_ROOT_PAGE } from "./quickAccess.constants";
import { Action } from "../../store/index.reducer";
import { BillPayment, MobileTopUp } from "types/quickAccess";

export interface ExtraActionInfo {
  sagas: boolean | undefined;
}

// QuickAccess
export const QuickAccessRootPage = (rootPage: any) => {
  return {
    type: QUICKACCESS_ROOT_PAGE,
    payload: rootPage,
  };
};

// Mobile TopUp
export const mobileOperatorName = (operatorName: any) => {
  return {
    type: QUICKACCESS_OPERATORNAME,
    payload: operatorName,
  };
};

export const childPhoneNumber = (childPhone: any) => {
  return {
    type: QUICKACCESS_CHILDPHONE,
    payload: childPhone,
  };
};
//mobile Bill
export const setMobileBillPayment = (
  data: BillPayment,
  options?: ExtraActionInfo
): Action<BillPayment> => {
  return {
    type: options?.sagas ? SAGAS_BILLPAYMNET : BILLPAYMENT,
    payload: data,
  };
};

//mobileTopUp

export const setMobileTopUpPayment = (
  data: MobileTopUp,
  options?: ExtraActionInfo
): Action<MobileTopUp> => {
  return {
    type: options?.sagas
      ? QUICKACCESS_SAGAS_MOBILETOPUP
      : QUICKACCESS_MOBILETOPUP,
    payload: data,
  };
};
