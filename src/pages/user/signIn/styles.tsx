import { Dimensions, StyleSheet } from "react-native";
import { colors, iosBoxShadow } from "constants/index";

const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  inputContainer: {
    width: width,
    height: height,
    backgroundColor: "white",
    justifyContent: "space-around",
    alignItems: "center",
  },
  inputBox: { justifyContent: "center", alignItems: "center" },
  inputPack: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: width * 0.8,
    height: height < 700 ? height * 0.28 : height * 0.2,
  },
  textInputBox: {
    width: width * 0.89,
    height: 80,
  },
  errorBox: {
    width: width * 0.8,
    height: height * 0.04,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  errorText: {
    fontSize: 12,
    color: "#f52727",
    marginRight: "10%",
    width: width,
  },
  button: { width: width * 0.89, height: 44 },
  touch: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  textButton: {
    color: "white",
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  forgetTouch: {
    width: width * 0.89,
    height: height * 0.04,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  blueText: {
    fontSize: 16,
    color: "#0c96ff",
  },
  noRegister: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  fingerBox: {
    width: width,
    height: height * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    margin: 0,
  },
  modalContainer: {
    minHeight: 250,
    width: "100%",
    backgroundColor: colors.white,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    alignItems: "center",
    padding: 15,
    paddingTop: 10,
    paddingBottom: 30,
    position: "absolute",
    bottom: 0,
    elevation: 15,
    ...iosBoxShadow,
  },
  modalTitle: {
    fontSize: 14,
    color: colors.title,
  },
  modalIconWrapper: {
    paddingTop: 35,
    paddingBottom: 20,
  },
  modalDescription: {
    textAlign: "center",
    color: colors.title,
    fontSize: 14,
    lineHeight: 23,
    width: "60%",
  },
  modalCancelButton: {
    width: 170,
    height: 44,
    marginTop: 30,
  },
});
