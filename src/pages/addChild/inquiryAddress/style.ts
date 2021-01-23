import { StyleSheet } from "react-native";
import { colors, IOS } from "constants/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  contentWrapper: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 14,
    paddingVertical: 20,
  },
  addressSection: {
    width: "100%",
    padding: 15,
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  haveCardWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 2,
    height:45
  },
  haveCardTitle: {
    fontSize: 16,
    paddingRight: 4,
    lineHeight: IOS ? 10 : 20,
  },
  haveCardDescription: {
    fontSize: 12,
    lineHeight: 22,
    color: colors.gray600,
    paddingTop: 10,
  },
  address: {
    fontSize: 13,
    lineHeight: 22,
    color: colors.title,
    marginVertical: 15,
  },
  editAddressButtonWrapper: {
    width: "60%",
    height: 50,
    alignSelf: "flex-end",
  },
  privacySwitchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  privacyText: {
    marginLeft: 15,
    lineHeight: 15,
    color: colors.gray200,
  },
  privacyModalButton: {
    color: colors.links,
  },
  addressModalContent: {
    padding: 15,
  },
  addressModalTitle: {
    fontSize: 13,
    color: colors.gray300,
  },
  addressWrapper: {
    marginTop: 5,
    marginBottom: 20,
  },
  verticalSpace: {
    height: 16,
  },
  buttonWrapper: {
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  mobilePaymentMethodContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  mobilePaymentMethodTitle: {
    fontSize: 16,
    color: colors.title,
  },
  mobilePaymentMethodItemsWrapper: {
    flex: 1,
    paddingTop: 30,
  },
  mobilePaymentMethodItem: {
    height: 45,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mobilePaymentMethodItemTitleWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  mobilePaymentMethodItemTitle: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 3,
    marginTop: 22,
    lineHeight: 24,
  },
  mobilePaymentMethodItemDescription: {
    fontSize: 12,
    color: colors.gray600,
  },
  mobilePaymentMethodItemInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mobilePaymentMethodItemInput: {
    width: 100,
    height: 35,
    marginRight: 10,
  },
  currencyUnit: {
    fontSize: 13,
    color: colors.gray600,
  },
  mobilePaymentMethodButtonWrapper: {
    padding: 20,
  },
});
