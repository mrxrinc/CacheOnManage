import { StyleSheet } from "react-native";
import { colors, IOS } from "constants/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray850,
  },
  content: { paddingHorizontal: 17, padding: 30 },
  columns: {
    flexDirection: "row",
  },
  rightCol: {
    width: "85%",
  },
  leftCol: {
    width: "15%",
    paddingTop: IOS ? 80 : 90,
  },
  pickerItems: {
    // just ios
    fontFamily: "IRANSansMobileFaNum",
  },
  disabledButton: {
    backgroundColor: colors.disable,
  },
  inputWrapper: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  parentFeild: {
    width: "100%",
    borderRadius: 5,
    padding: 7,
    borderWidth: 1,
    borderColor: "#01065d",
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
  },
  parentText: {
    paddingRight: 10,
    paddingTop: 10,
  },
  childFeild: {
    width: "100%",
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#01065d",
    marginTop: 10,
    marginBottom: 10,
    height: 50,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: colors.gray700,
  },
  input: {
    color: colors.gray200,

    width: "100%",
    height: 50,
    textAlign: "right",
    fontFamily: "IRANSansMobileFaNum",
    fontSize: 18,
  },
  button: {
    borderRadius: 15,
    backgroundColor: "#43e6c5",
  },
  submitButton: {
    height: 43,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonWrapper: {
    width: "100%",
    height: 90,
    paddingHorizontal: 30,
  },
  submitButtonTitle: {
    color: "#fff",
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
  modalHead: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  modalLogoWrapper: {},
  modalLogo: {
    width: 48,
    height: 48,
    backgroundColor: colors.accent,
    borderRadius: 50,
  },
  modalCloseWrapper: {
    width: 48,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    borderWidth: 0,
    height: 12,
  },
  modalTitleWrapper: {
    justifyContent: "flex-end",
    height: 48,
  },
  modalTitle: {
    color: colors.gray400,
    fontSize: 14,
  },
  modalContent: {
    padding: 20,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 5,
    marginTop: 30,
  },
  modalConfirmIconWrapper: {
    width: 72,
    height: 72,
    borderWidth: 3,
    borderColor: colors.accent,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: -57,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  modalResultTitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 40,
  },
  modalResultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 5,
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
  modalResultValueUnit: {
    color: colors.gray500,
    fontSize: 10,
    paddingRight: 2,
  },
});
