import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
    container: {
      alignItems: "center",
      alignSelf: "center",
    },
    month: {
      width: 67,
      borderRadius: 9,
      backgroundColor: colors.white,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 5,
    },
    monthText: {
      color: colors.title,
      paddingTop: 2,
    },
    year: {
      color: colors.title,    },
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