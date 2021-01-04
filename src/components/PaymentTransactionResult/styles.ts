import { StyleSheet } from "react-native";
import { colors, IOS } from "constants/index";

export default StyleSheet.create({
  inquiryResultWrapper: {
    padding: 15,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
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
    color: colors.gray500,
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
  rowWrapper: {
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "flex-end",
  },
  transactionNames: {},
  closeButton: {
    height: 44,
    borderRadius: 30,
    backgroundColor: "#43e6c5",
    width: "100%",
  },
});
