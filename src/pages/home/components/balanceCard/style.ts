import { StyleSheet } from "react-native";
import { colors } from "constants/index";
import { iosBoxShadow } from "constants/index";

export default StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: "100%",
    height: 210,
    backgroundColor: colors.white,
    borderRadius: 15,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: colors.gray800,
    elevation: 5,
    ...iosBoxShadow,
  },
  head: {
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.placeholder,
    backgroundColor: colors.gray700,
  },
  accountDetailSection: {
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: "#baeffc",
    marginHorizontal: 16,
    marginTop: 7,
  },
  balances: {
    fontSize: 16,
    color: colors.gray200,
  },
  currency: {
    fontSize: 12,
    fontWeight: "100",
    color: colors.gray600,
    paddingLeft: 10,
  },
  amountWrapper: {
    width: "45%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: colors.f,
  },
  chartSection: {
    flex: 1,
    paddingBottom: 5,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#baeffc",
    marginHorizontal: 16,
  },
  chartTitle: {
    fontSize: 14,
    color: colors.gray200,
    marginBottom: 12,
  },
  chart: {
    width: "100%",
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray900,
    overflow: "hidden",
  },
  progress: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray500,
  },
  paymentMethodWrapper: {
    height: 62,
    justifyContent: "center",
  },
  paymentMethod: {
    height: 36,
    backgroundColor: colors.gray900,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  paymentMethodText: {
    fontSize: 14,
    color: colors.title,
    lineHeight: 21,
  },
  paymentButtonArrow: {
    marginTop: 3,
    marginLeft: 3,
  },
});
