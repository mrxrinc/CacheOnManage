import { StyleSheet } from "react-native";
import { colors, IOS } from "constants/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: colors.white,
  },
  content: {
    paddingTop: 5,
    paddingHorizontal: 17,
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  materialInput: {
    textAlign: "right",
    fontSize: 14,
  },
  inputBox: {
    width: "100%",
    maxWidth: 130,
    height: 25,
  },
  input: {
    height: 25,
    padding: 0,
    lineHeight: IOS ? 16 : 30,
    fontSize: 14,
  },
  halfWidth: {
    width: "50%",
  },
  getPassButtonWrapper: {
    marginBottom: 2,
  },
  getPassButton: {
    height: 25,
    width: "92%",
    maxWidth: 130,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowOpacity: 0.18,
    shadowColor: colors.dark,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 3 },
  },
  getPassButtonTitle: {
    fontSize: 14,
    color: colors.white,
    lineHeight: IOS ? 10 : 14,
    textAlignVertical: "center",
  },
  timerWrapper: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
  },
  stopwatchStyle: {
    transform: [{ scale: 0.7 }],
  },
  messageWrapper: {
    paddingBottom: 20,
  },
  message: {
    fontSize: 12,
  },
  submitButtonWrapper: {
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 50,
    paddingTop: 5,
    backgroundColor: "transparent",
    height: 60,
  },
  submitButton: {
    height: 43,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonTitle: {
    fontSize: 17,
    color: colors.white,
  },
  modal: {
    margin: 0,
  },
  modalContainer: {
    height: "70%",
    width: "100%",
    backgroundColor: colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: "absolute",
    bottom: 0,
    padding: 16,
    paddingBottom: 5,
  },
  modalSwipeHandle: {
    width: 100,
    height: 3,
    borderRadius: 10,
    backgroundColor: colors.white,
    opacity: 0.8,
    alignSelf: "center",
    top: -22,
  },
  modalHead: {
    width: "100%",
    height: 36,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalLogoWrapper: {},
  modalLogo: {
    width: 36,
    height: 36,
    // backgroundColor: colors.placeholder,
    borderRadius: 50,
  },
  modalCloseWrapper: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
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
  modalTitleWrapper: {
    justifyContent: "center",
    height: 48,
  },
  modalTitle: {
    color: colors.gray200,
    fontSize: 16,
  },
  modalContent: {
    padding: 20,
    borderRadius: 5,
    paddingBottom: 5,
  },
  modalConfirmIconWrapper: {
    width: 36,
    height: 36,
    alignSelf: "center",
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  modalResultTitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 55,
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
    color: colors.gray400,
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
    color: colors.gray300,
    flexShrink: 0,
    paddingRight: 10,
    zIndex: 1,
  },
  modalResultValueUnit: {
    color: colors.gray300,
    fontSize: 12,
    paddingRight: 3,
  },
  modalFooter: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    height: 30,
  },
  logoStyle: {
    width: 50,
    height: 22,
    resizeMode: "contain",
  },
});
