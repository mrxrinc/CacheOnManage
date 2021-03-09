import { LayoutAnimation } from "react-native";
export const customAnim = LayoutAnimation.create(
  150,
  LayoutAnimation.Types.easeInEaseOut,
  LayoutAnimation.Properties.opacity
);
