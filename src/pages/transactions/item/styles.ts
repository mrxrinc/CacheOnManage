import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 15,
    shadowOpacity: 1,
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 11,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10,
    elevation: 5,
  },
  payment: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 11,
  },
  paymentIn: {
    color: colors.accent,
  },
  title: {
    flex: 1,
    marginLeft: 10,
  },
  paymentTop: {
    color: colors.red,
    marginBottom: 3,
  },
  paymentBottom: {
    color: colors.gray550,
  },
  titleText: {
    color: colors.gray250,
    marginBottom: 3,
  },
  titleTime: {
    color: colors.gray550,
    fontSize: 12,
  },
});
