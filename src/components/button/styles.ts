import { iosBoxShadow } from "constants/index";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: 45,
    backgroundColor: "#fff",
    ...iosBoxShadow,
  },
  button: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
