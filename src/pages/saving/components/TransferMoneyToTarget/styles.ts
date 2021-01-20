import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: "#ffffff",
    padding: 20,
  },

  inputWrapper: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },

  parentText: {
    paddingRight: 10,
    height: 44,
  },

  amountInput: {
    fontFamily: "IRANSansMobileFaNum",
  },
  input: {
    borderBottomColor: "#ddd",
    width: "100%",
    fontFamily: "IRANSansMobileFaNum",
    height: 50,
    textAlign: "right",
    fontSize: 17,
    marginBottom: 10,
  },
  button: {
    borderRadius: 15,
    backgroundColor: "#43e6c5",
  },
  submitButton: {
    height: 44,
    borderRadius: 30,
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
    color: "#515c6f",
    fontSize: 14,
    marginLeft: 5,
  },
  radioBtn: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#43e6c5",
    borderRadius: 10,
  },
  redColor: {
    borderColor: "red",
  },
  radioBtnBox: {
    marginBottom: 20,
  },
});
