import { LayoutAnimation } from "react-native";
export const animConfig = LayoutAnimation.configureNext(
  LayoutAnimation.create(
    400,
    LayoutAnimation.Types.easeInEaseOut,
    LayoutAnimation.Properties.opacity
  )
);
