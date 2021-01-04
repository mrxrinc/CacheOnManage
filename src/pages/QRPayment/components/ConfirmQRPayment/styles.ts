import { colors } from "constants/index";
import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmBox: {
    width: "90%",
    borderRadius: 20,
    minHeight: 200,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    elevation: 15,
  },
  btnWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  blueBox: {
    minWidth: 150,
    height: 33,
    backgroundColor: "#e1f1fa",
    borderRadius: 5,
    textAlign: "center",
    color: "#00015d",
    lineHeight: 30,
    marginBottom: 30,
    marginTop: 30,
  },
  submitButton: {
    width: 180,
    height: 43,
    borderRadius: 30,
    backgroundColor: "#43e6c5",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginRight: 10,
  },
  editButton: {
    width: 100,
    height: 43,
    borderRadius: 30,
    backgroundColor: "#00afff",
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
  paymentTitle: {
    fontSize: 16,
  },
});
