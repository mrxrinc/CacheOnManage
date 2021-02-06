import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: 75,
  },
  statusBar: {
    width: "100%",
    height: 25,
  },
  navbar: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row-reverse",
  },
  titleWrapper: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
  },
  backWrapper: {
    width: 48,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
    top: 0,
  },
});
