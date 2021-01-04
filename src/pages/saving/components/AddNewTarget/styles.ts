import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  titleInput: {
    padding: 0,
  },
  titleInputWrapper: {
    marginBottom: 0,
  },
  halfWidth: {
    width: "45%",
  },
  input: {
    backgroundColor: "#f4f6fa",
    borderRadius: 5,
    padding: 5,
    textAlign: "center",
  },
  startDate: {
    backgroundColor: "#f4f6fa",
    borderRadius: 7,
    padding: 5,
    textAlign: "center",
    height: 40,
    width: "45%",
    lineHeight: 40,
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
    color: "#8b8b8b",
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
    fontSize: 12,
  },
  unit: {
    width: "10%",
    textAlign: "right",
  },
  targetDesc: {
    fontSize: 14,
    color: "#515c6f",
  },
});
