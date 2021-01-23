import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
  },
  inputBox:{
    width: "100%",
    height: 62,
    justifyContent: "center",
  },
  inputPack:{
    justifyContent: "center",
    height: 52,
    backgroundColor: "#f5f7fa",
    borderRadius: 10,
  },
  textInput:{
    marginLeft: "2%",
    fontFamily: "IRANSansMobile",
    textAlign: "right",
  },
  errorFont:{ color: "red", fontSize: 12 },
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
});
