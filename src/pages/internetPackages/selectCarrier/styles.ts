import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  phoneNumberWrapper: {
    width: "100%",
    height: 60,
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
  currentCarrierLogo: {
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
  simcardTypeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  switcherWrapper: {
    width: "50%",
    flexDirection: "row",
  },
  simcardTypeTitle: {
    fontSize: 14,
    color: colors.text,
  },
  chooseCarrierText: {
    fontSize: 16,
    color: colors.title,
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  carrierWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 3,
    paddingHorizontal: 20,
  },
  carrierLogoTitleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
  },
  carrierName: {
    fontSize: 16,
    color: colors.title,
    marginLeft: 6,
  },
  buttonWrapper: {
    marginTop: 80,
    width: "100%",
    height: 60,
    paddingHorizontal: 20,
  },
});
