import { StyleSheet } from "react-native";
import { colors, iosBoxShadow, width, height } from "constants/index";

export default StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    minHeight: 200,
    width: "100%",
    backgroundColor: colors.white,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    alignItems: "center",
    paddingTop: 10,
    position: "absolute",
    bottom: 0,
    elevation: 15,
    ...iosBoxShadow,
  },
  title: {
    fontSize: 16,
    color: colors.title,
  },
  inputPack: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 0,
    marginTop: 25,
  },
  textInputBox: {
    height: 70,
    width: "100%",
  },
  textStyle: {
    color: colors.title,
    fontSize: 12,
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
    color: colors.red,
    marginRight: "10%",
    width: width,
  },
  buttonsWrapper: {
    marginTop: 10,
    marginBottom: 32,
  },
});
