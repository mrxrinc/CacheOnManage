import { HOME_DATA } from "./home.constants";

// home data
export const getHomeData = (homeData: any) => {
  return {
    type: HOME_DATA,
    payload: homeData,
  };
};
