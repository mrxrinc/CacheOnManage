import { StyleSheet } from "react-native";
import { colors, IOS } from "constants/index";
import { iosBoxShadow } from "constants/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray900,
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  remainingDaysWrapper: {
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  remainingDays: {
    color: colors.title,
    fontSize: 13,
  },
  contentBox: {
    borderRadius: 15,
    elevation: 5,
    backgroundColor: colors.white,
    marginBottom: 13,
    paddingVertical: 5,
    ...iosBoxShadow,
  },
  head: {
    height: 50,
    justifyContent: "flex-start",
    alignItems: "center",
    bottom: 45,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: colors.placeholder,
    backgroundColor: colors.gray700,
  },
  accountDetailSection: {
    paddingTop: 5,
    paddingBottom: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amountWrapper: {
    width: "50%",
    paddingHorizontal: 15,
  },
  amountRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  amountTextBox: {
    alignItems: "center",
    paddingTop: 5,
  },
  amountTitle: {
    fontSize: 12,
    color: colors.gray500,
    textAlign: "center",
  },
  balances: {
    fontSize: 18,
    color: colors.title,
  },
  currency: {
    fontSize: 12,
    fontWeight: "100",
    color: colors.gray400,
    paddingLeft: 10,
  },
  sumCash: {
    width: "100%",
    height: 45,
    backgroundColor: colors.gray900,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  sumCashText: {
    fontSize: 15,
    color: colors.title,
    lineHeight: IOS ? 10 : 20,
  },
  blueLine: {
    width: "90%",
    height: 1,
    backgroundColor: "#baeffc",
    marginVertical: 20,
    alignSelf: "center",
  },
  chartSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: "center",
  },
  chartTitle: {
    fontSize: 14,
    color: colors.gray200,
    marginBottom: 15,
  },
  chart: {
    width: "100%",
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray900,
  },
  progress: {
    width: "50%",
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray500,
  },
  twinChildRow: {
    width: "100%",
    height: 40,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  twinChildTextKey: {
    fontSize: 14,
    color: colors.gray400,
  },
  twinChildTextValue: {
    fontSize: 18,
    color: colors.gray200,
  },
  twinLinkWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loading:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
