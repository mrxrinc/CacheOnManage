import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    alignSelf: "center",
  },
  month: {
    minWidth: 67,
    borderRadius: 50,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    height: 22,
  },
  monthText: {
    color: colors.title,
    paddingHorizontal: 5,
  },
  year: {
    color: colors.title,
  },
  yearActive: {
    color: colors.buttonOpenActive,
  },
  monthActive: {
    backgroundColor: colors.buttonOpenActive,
  },
  monthTextActive: {
    color: colors.white,
  },
});
