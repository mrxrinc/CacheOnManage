import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    height: 64,
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  biggerButton: {
    flex: 1,
  },
  smallerButton: {
    minWidth: 100,
  },
  spacer: {
    width: "2%",
  },
});
