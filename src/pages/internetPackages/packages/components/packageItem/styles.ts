import { StyleSheet } from "react-native";
import { colors, iosBoxShadow } from "constants/index";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: 87,
    borderRadius: 8,
    backgroundColor: colors.white,
    marginBottom: 12,
    padding: 12,
    paddingHorizontal: 16,
    borderColor: colors.buttonSubmitActive,
    elevation: 10,
    ...iosBoxShadow,
  },
  title: {
    fontSize: 14,
    color: colors.text,
  },
  periodPriceWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 7,
  },
  period: {
    fontSize: 12,
    color: colors.gray300,
  },
  amount: {
    fontSize: 16,
    color: colors.title,
  },
  currency: {},
});
