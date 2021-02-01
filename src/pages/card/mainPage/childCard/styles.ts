import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: 230,
    justifyContent: "center",
    alignItems: "center",
  },
  cardBox: {
    width: 300,
    height: 200,
    paddingHorizontal: 30,
    paddingTop: 36,
    paddingBottom: 19,
  },
  frontDataWrapper: {
    justifyContent: "space-between",
    height: "100%",
  },
  cardImage: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  logoAndSimCartWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  blueLogo: {
    width: 24,
    height: 35,
  },
  ownerInformationWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cartTexts: {
    color: colors.white,
    fontSize: 16,
  },
  userStateWrapper: {
    alignItems: "flex-end",
  },
});
