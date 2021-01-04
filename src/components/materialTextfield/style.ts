import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
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
});
