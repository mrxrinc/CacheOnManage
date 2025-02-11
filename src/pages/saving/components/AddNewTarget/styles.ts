import { StyleSheet } from "react-native";
import { colors, width } from "constants/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },

  titleInputWrapper: {
    width: width * 0.89,
    height: 59,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  halfWidth: {
    width: "45%",
  },
  input: {
    width: "100%",
    color: colors.eggplant,
    height: 30,
    padding: 0,
    margin: 0,
  },
  inputInner: {
    color: colors.eggplant,
    padding: 0,
    margin: 0,
    height: 30,
  },
  disableInput: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  inputContainer: {
    height: 60,
  },
  targetDateBox: {
    backgroundColor: "#f4f6fa",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: "45%",
  },
  targetDate: {
    lineHeight: 28,
    fontSize: 16,
    color: colors.eggplant,
  },
  alignLeft: {
    textAlign: "left",
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateWrapper: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  submitButton: {
    height: 43,
    borderRadius: 30,
    backgroundColor: "#43e6c5",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  gray: {
    color: colors.brownishGrey,
  },
  disabledButton: {
    backgroundColor: colors.disable,
  },
  submitButtonTitle: {
    color: "#fff",
  },
  dateBox: {
    borderTopWidth: 1,
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  dateInput: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "white",
    borderBottomColor: "#afafaf",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  datePickerItem: {
    fontFamily: "IRANSansMobileFaNum",
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  unit: {
    width: "10%",
    textAlign: "right",
    marginTop: 12,
  },
  targetDesc: {
    fontSize: 14,
    color: "#515c6f",
  },
});
