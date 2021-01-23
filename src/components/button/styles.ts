import { StyleSheet } from "react-native";
import {Typography} from "styles"

export default StyleSheet.create({
  container: {
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 3 },
  },
  test:{
    lineHeight: 25,
    fontSize: ...Typography.fontSize.x16,
    color: "white",
    // ...titleStyle,
  }
});
