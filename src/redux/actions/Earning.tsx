import { EARNING_DATA } from "redux/actions/ActionTypes";

// home data
export const getEarningData = (earningData: any) => {
  return {
    type: EARNING_DATA,
    payload: earningData,
  };
};
