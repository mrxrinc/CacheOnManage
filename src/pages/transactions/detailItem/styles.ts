import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
    content: {
      borderRadius: 15,
      backgroundColor: colors.white,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 15,
      shadowOpacity: 1,
      padding: 16,
      marginHorizontal: 20,
      marginTop: 28,
      marginBottom: 20,
    },
    img: {
      width: 48,
      height: 48,
      marginRight: 6,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 30,
    },
    title: {
      fontSize: 16,
    },
  });