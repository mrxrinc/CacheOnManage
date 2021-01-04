import { WToast } from "react-native-smart-tip";

export const showNotify = (settings: any | Error): void => {
  const toastOpts = {
    textColor: "blue",
    backgroundColor: "#f3f3f3",
    duration: WToast.duration.SHORT,
    position: WToast.position.BOTTOM,
    isShowShadow: true,
    ...settings,
  };
  return WToast.show(toastOpts);
};
WToast.hide();
export default showNotify;
