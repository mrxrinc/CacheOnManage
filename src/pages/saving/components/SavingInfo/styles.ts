import { colors } from "constants/index";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  savingInfoBox: {
    backgroundColor: "#ffffff",
    height: 92,
    width: "100%",
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  totalAmount: {
    textAlign: "center",
    fontSize: 32,
    lineHeight: 43,
    marginRight: 5,
  },
  unit: {
    fontSize: 15,
  },
  weeklySavings: {
    textAlign: "center",
    fontSize: 12,
    color: colors.eggplant,
  },
});
