import { StyleSheet } from "react-native";
import { colors, width, height } from "constants/index";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: width,
    backgroundColor: colors.white,
  },
  noAllowanceBox: {
    padding: 16,
    paddingHorizontal: 20,
    width: "100%",
  },
  noAllowanseTitle: {
    color: colors.title,
    fontSize: 14,
    lineHeight: 17,
  },
  noAllowanseDescription: {
    color: colors.text,
    fontSize: 12,
    textAlign: "left",
    lineHeight: 17,
    marginTop: 10,
  },
  addAllowanceButton: {
    paddingHorizontal: 36,
    paddingTop: 16,
  },
  yesAllowanceBox: {
    width: width * 0.89,
    height: height * 0.083,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  textTitle: {
    fontSize: 16,
  },
  contentBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 3,
  },
  daysContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: 65,
    margin: "2%",
    flexDirection: "row",
  },
  activeBox: {
    width: 20,
    height: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#43e6c5",
  },
  addAllowanceModal: {
    width: width * 0.89,
    height: height * 0.45,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputBox: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "45%",
  },
  textInput: {
    width: 128,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#f4f6fa",
    textAlign: "center",
    fontFamily: "IRANSansMobileFaNum",
  },
  description: {
    fontSize: 14,
    color: colors.title,
    textAlign: "center",
    lineHeight: 28,
    paddingHorizontal: 20,
  },
  unequalButtonsWrapper: {
    width: "100%",
    alignItems: "center",
  },
});
