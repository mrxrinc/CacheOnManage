import { StyleSheet } from "react-native";
import { colors, IOS } from "constants/index";

export default StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
  },
  moneyInput: {
    backgroundColor: "transparent",
  },
  label: {
    fontFamily: "IRANSansMobileFaNum",
    paddingTop: 3,
    color: colors.gray600,
  },
  title: {
    fontFamily: "IRANSansMobileFaNum",
    paddingTop: 5,
    color: colors.red,
  },
  inputStyle: {
    fontFamily: "IRANSansMobileFaNum",
  },
  unit: {
    color: colors.gray500,
    fontSize: 14,
    paddingRight: 2,
    position: "absolute",
    right: 5,
    bottom: 12,
  },
  cacheonmanageInputBox: {
    width: "100%",
    justifyContent: "center",
  },
  cacheonmanageInputWrapper: {
    width: "100%",
    backgroundColor: "#f5f7fa",
    borderRadius: 10,
    justifyContent: "center",
  },
  cacheonmanageInput: {
    marginLeft: 10,
    fontFamily: "IRANYekanMobileFaNum",
    textAlign: "right",
    height: 44,
    fontSize: IOS ? 19 : 16,
  },
  errorFont: {
    color: colors.red,
    fontSize: 12,
  },
  iconWrapper: {
    width: 40,
    position: "absolute",
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },
  password: { color: colors.gray300 },
});
