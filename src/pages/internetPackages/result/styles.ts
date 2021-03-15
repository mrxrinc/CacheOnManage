import { StyleSheet } from "react-native";
import { colors, iosBoxShadow, width, height } from "constants/index";

export default StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 42,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  cardWrapper: {
    borderRadius: 15,
    padding: 15,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    elevation: 10,
    ...iosBoxShadow,
  },
  title: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  modalResultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  modalResultKeyText: {
    fontSize: 14,
    color: colors.text,
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
    fontSize: 14,
    flexShrink: 0,
    paddingRight: 10,
    zIndex: 1,
    color: colors.text,
  },
  inquiryModalButtonsWrapper: {
    height: 40,
    flexDirection: "row-reverse",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    marginBottom: 32,
    marginTop: 25,
  },
  appIconWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
  },
});
