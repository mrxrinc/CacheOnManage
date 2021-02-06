import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingTop: 20,
    paddingHorizontal: 20,
    height: "100%",
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 16,
    paddingVertical: 20,
  },
  button: {
    marginTop: 50,
  },
  buttonTitle: {
    color: colors.white,
  },
  inputPack: {
    // justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  inquiryModalContentWrapper: {
    padding: 10,
  },
  modalErrorIconWrapper: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  errorCircle: {
    width: 40,
    height: 40,
    backgroundColor: colors.red,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  inquiryErrorTitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 15,
    color: colors.title,
  },
  inquiryResultWrapper: {
    padding: 15,
    paddingBottom: 10,
  },
  modalResultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  modalResultKeyText: {
    fontSize: 13,
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
  contentWrapper: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
});
