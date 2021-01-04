import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray950,
  },
  itemsWrapper: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  buttonWrapper: {
    width: "100%",
    height: 95,
    paddingBottom: 50,
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
  },
});
