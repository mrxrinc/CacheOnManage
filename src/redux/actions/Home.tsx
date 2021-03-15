import { HOME_DATA } from "redux/actions/ActionTypes";

// home data
export const getHomeData = (homeData: any) => {
  return {
    type: HOME_DATA,
    payload: homeData,
  };
};
