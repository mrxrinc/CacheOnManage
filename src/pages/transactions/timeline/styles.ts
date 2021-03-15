import { StyleSheet } from "react-native";
import { colors, iosBoxShadow } from "constants/index";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: 8,
    maxHeight: 80,
    elevation: 8,
    marginTop: 10,
    ...iosBoxShadow,
  },
  content: {
    paddingHorizontal: 10,
  },
});
