import { Dimensions, Platform } from "react-native";

export const IOS = Platform.OS === "ios" ? true : false;

export const { width, height } = Dimensions.get("window");

export const iosBoxShadow = {
  shadowColor: "#000",
  shadowOpacity: 0.18,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 3 },
};

export const colors = {
  primary: "#27519e",
  accent: "#00c47b",
  blue: "#0c96ff",
  blueDeep: "#1f3f78",
  red: "#f52727",
  disable: "#c9cbcc",

  // new colors
  blujrBtnOpenActive: "#307fe2",
  buttonOpenActive: "#00afff",
  buttonOpenActive50: "#00afff80",
  buttonOpenPressed: "#0498db",
  buttonSubmitActive: "#43e6c5",
  buttonSubmitActive50: "#43e6c580",
  buttonSubmitPressed: "#1cddb5",
  buttonDestructiveActive: "#fa5050",
  buttonDestructiveActive50: "#fa505080",
  buttonDestructivePressed: "#f73e3e",
  switch: "#4EADF8",
  placeholder: "#8387fc",
  title: "#00015d",
  links: "#0c96ff",
  text: "#515c6f",
  star: "#ffe200",
  brownishGrey: "#707070",
  gradientRight: "#BB6AFF",
  gradientLeft: "#397FFF",
  paleGrey: "#f5f7fa",
  dark: "#000",
  gray100: "#191919",
  gray200: "#202020",
  gray250: "#333333",
  gray300: "#4a4a4a",
  gray400: "#777",
  gray500: "#9b9b9b",
  gray550: "#8b8b8b",
  gray600: "#b7b7b7",
  gray650: "#cbcbcb",
  gray700: "#e2e2e2",
  gray800: "#e9e9e9",
  gray850: "#eee",
  gray900: "#f4f6fa",
  gray950: "#fafafa",
  white: "#fff",
  clearBlue5: "rgba(48,127,226,0.05)",
  brownGrey: "#afafaf",
  warmGrey: "#8d8b8b",
  // just for debugging purpose
  d: "#C8CA2633",
  f: "#ff00aa33",

  //kyc
  eggplant: "#110820",
  pinkRed: "#e40046",
  turquoise: "#00bfb2",
  cornflowerBlue: "#497edb",
  lightGreyBlue: "#bbbcbc",
  yellowOrange: "#f2a900",
};
