import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  swiperStyle: {
    flexDirection: "row-reverse",
  },
  paginationStyle: {
    alignItems: "flex-end",
    bottom: 0,
    backgroundColor: colors.white,
    flexDirection: "row-reverse",
  },
  ButtonsContainer: {
    width: "100%",
    height: 84,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  button: {
    width: "48.5%",
  },
});
