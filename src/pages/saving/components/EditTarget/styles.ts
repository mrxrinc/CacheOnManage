import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
    maxHeight: 450,
  },

  titleInput: {
    width: "100%",
    fontSize: 17,
    fontFamily: "IRANSansMobileFaNum",
    height: 50,
    textAlign: "right",
  },
  titleInputWrapper: {
    marginTop: "4%",
    marginBottom: "4%",
  },
  halfWidth: {
    width: "45%",
  },
  input: {
    width: "100%",
    color: "#00015d",
    height: 30,
    padding: 0,
    margin: 0,
  },
  inputInner: {
    color: "#00015d",
    padding: 0,
    margin: 0,
    height: 30,
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
    color: "#00015d",
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    height: 30,
  },
  submitButton: {
    width: "47%",
    height: 44,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 45,
    marginBottom: 15,
  },
  gray: {
    color: "#8b8b8b",
    fontSize: 14,
  },
  amountHint: {
    color: "#afafaf",
    fontSize: 12,
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
  modal: {
    margin: 0,
  },
  modalContainer: {
    height: 290,
    width: "100%",
    backgroundColor: colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: "absolute",
    bottom: 0,
    padding: 16,
  },
  modalSwipeHandle: {
    width: 100,
    height: 3,
    borderRadius: 10,
    backgroundColor: colors.white,
    opacity: 0.8,
    alignSelf: "center",
    top: -20,
  },
  datePickerItem: {
    fontFamily: "IRANSansMobileFaNum",
  },
  error: {
    color: "red",
    marginBottom: 20,
    fontSize: 12,
  },
  unit: {
    width: "10%",
    textAlign: "right",
    color: "#00015d",
  },
});
