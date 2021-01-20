import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
  },
  moneyInput: {
    backgroundColor: "transparent",
    fontFamily: "IRANSansMobile",
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
    fontSize: 18,
  },
  unit: {
    color: colors.gray500,
    fontSize: 14,
    paddingRight: 2,
    position: "absolute",
    right: 5,
    bottom: 12,
  },
  blujrInputWrapper: {
    width: "100%",
    height: 52,
    backgroundColor: "#f5f7fa",
    borderRadius: 10,
    justifyContent: "center",
  },
  blujrInput: {
    marginLeft: 10,
    fontFamily: "IRANSansMobileFaNum",
    textAlign: "right",
  },
  iconWrapper: {
    width: 35,
    height: "100%",
    position: "absolute",
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 13,
    backgroundColor: "red",
  },
});
