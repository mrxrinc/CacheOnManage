import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
  invoiceHeader: {
    height: 40,
    backgroundColor: colors.gray900,
    justifyContent: "center",
    alignItems: 'center',
    marginBottom: 20,
  },
  invoiceTitle: {
    textAlign: "center",
    color: colors.blueDeep,
    fontSize: 16,
  },
});
