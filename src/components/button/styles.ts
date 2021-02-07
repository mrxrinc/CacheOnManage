import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: 45,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 3 },
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
