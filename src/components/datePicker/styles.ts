import { StyleSheet } from "react-native";
import { colors } from "constants/index";

const buttonMoneyCommonStyle = {
  width: "100%",
  height: 52,
  paddingBottom: 5,
  justifyContent: "flex-end",
};

export default StyleSheet.create({
  buttonMoneyInactive: {
    ...buttonMoneyCommonStyle,
    borderBottomWidth: 1,
    borderColor: colors.gray600,
  },
  buttonMoneyActive: {
    ...buttonMoneyCommonStyle,
    borderBottomWidth: 2,
    borderColor: colors.title,
  },
  buttoncacheonmanage: {
    width: "100%",
    height: 52,
    backgroundColor: "#f5f7fa",
    borderRadius: 10,
    justifyContent: "center",
    padding: 15,
  },
  label: {
    fontSize: 16,
    color: colors.gray500,
  },
  iconWrapper: {
    width: 40,
    height: 52,
    position: "absolute",
    right: 0,
    top: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLight: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
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
    height: 4,
    borderRadius: 10,
    backgroundColor: colors.white,
    opacity: 0.8,
    alignSelf: "center",
    top: -23,
  },
  datePickerItem: {
    fontFamily: "IRANSansMobileFaNum",
  },
  ageWarning: {
    textAlign: "center",
    marginBottom: 20,
    color: colors.primary,
  },
  modalButtonWrapper: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
