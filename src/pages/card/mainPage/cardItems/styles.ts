import { StyleSheet, Dimensions } from "react-native";
import { colors } from "constants/index";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  itemBox: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "4%",
  },
  itemFont: { marginTop: "-14%", fontSize: 14, color: "#00015d" },
  setPasswordContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "30%",
  },
  setPasswordBox: {
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    height: "100%",
  },
  description: { width: "100%", justifyContent: "flex-start" },
  passwordsBox: {
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
  },
  passwordPack: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: 44,
    borderWidth: 1,
  },
  inquiryResultWrapper: {
    padding: 15,
    paddingBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  changePasswordDescription: { width: "100%", marginBottom: "5%" },
  changePasswordDescriptionText: {
    color: "#00015d",
    fontSize: 16,
  },
  modalResultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    // marginBottom: 5,
  },
  modalResultKeyText: {
    fontSize: 13,
    color: colors.gray500,
    flexShrink: 0,
    backgroundColor: colors.white,
    zIndex: 1,
    paddingLeft: 10,
  },
  modalResultMiddleLine: {
    width: "100%",
    position: "absolute",
    zIndex: 0,
    height: 1,
    backgroundColor: colors.gray800,
  },
  modalResultValueTextWrapper: {
    flexDirection: "row",
    backgroundColor: colors.white,
    alignItems: "flex-end",
  },
  modalResultValueText: {
    flexShrink: 0,
    paddingRight: 10,
    zIndex: 1,
  },
  inquiryModalButtonsWrapper: {
    height: 40,
    flexDirection: "row-reverse",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  errorBox: { width: "100%", height: 50 },
  errorText: { color: "#f73e3e", fontSize: 11 },
  changePasswordInput: { width: 160, height: 40 },
  buttonBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
});
