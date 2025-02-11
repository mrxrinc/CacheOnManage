import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    padding: 20,
  },

  inputWrapper: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },

  submitButton: {
    height: 44,
    width: "100%",
  },
  submitButtonWrapper: {
    width: "100%",
    height: 90,
    paddingHorizontal: 15,
  },
  submitButtonTitle: {
    color: "#fff",
  },
  activityButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  activityText: {
    color: colors.text,
    fontSize: 14,
    marginLeft: 5,
  },
  radioBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
  redColor: {
    borderColor: colors.red,
  },
  radioBtnBox: {
    marginBottom: 20,
  },
  radioWhiteBg: {
    backgroundColor: colors.white,
  },
});
