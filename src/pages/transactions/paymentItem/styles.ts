import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
    item: {
      flexDirection: "row",
      marginBottom: 20,
    },
    itemTitle: {
      color: colors.text,
    },
    line: {
      borderStyle: "dashed",
      borderWidth: 0.6,
      borderColor: colors.disable,
      height: 0.1,
      flex: 1,
      alignSelf: "center",
      marginHorizontal: 17.5,
      marginTop: 5,
    },
    itemPayment: {
      color: colors.text,
    },
    rial: {
    },
  });