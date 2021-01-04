import { EARNING_DATA } from "./earning.constants";

// home data
export const getEarningData = (earningData: any) => {
  return {
    type: EARNING_DATA,
    payload: earningData,
  };
};
