import { StyleSheet } from "react-native";
import { colors, iosBoxShadow } from "constants/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contentBox: {
    borderRadius: 10,
    elevation: 15,
    ...iosBoxShadow,
    minHeight: 200,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 18,
    lineHeight: 27,
    marginTop: 15,
    marginBottom: 12,
    color: colors.title,
    textAlign: "center",
  },
  phoneNumberWrapper: {
    height: 50,
    marginVertical: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.gray900,
  },
  phoneNumber: {
    fontSize: 14,
    color: colors.text,
  },
  phoneNumberBesideLogo: {
    fontSize: 16,
    marginRight: 10,
  },
  currentOperatorLogo: {
    width: 32,
    height: 32,
    overflow: "hidden",
    borderRadius: 8,
  },
  mobileAndLogo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  amountWithTaxTitle: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
    marginBottom: 10,
  },
  amount: {
    fontSize: 16,
    color: colors.title,
    lineHeight: 24,
    marginTop: 8,
  },
  buttonsWrapper: {
    marginTop: 40,
    marginBottom: 32,
  },
  modalTextWrapper: {
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  modalText: {
    textAlign: "center",
    fontSize: 13,
    lineHeight: 24,
  },
  modalButton: {
    width: "50%",
    alignSelf: "center",
    marginTop: 2,
    marginBottom: 32,
  },
  modalButtonsWrapper: {
    marginTop: 10,
    marginBottom: 32,
  },
});
