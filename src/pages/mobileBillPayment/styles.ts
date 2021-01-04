import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center" },
  pageContainer: {
    height: height * 0.9,
    alignItems: "center",
  },
  phoneBox: {
    width: width,
    height: 0.09 * height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6fa",
    marginTop: "4%",
  },
  phonePack: {
    width: width * 0.89,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  phoneNumText: { color: "#515c6f", fontSize: 14 },
  phoneNumBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  phoneNum: { color: "#333333", fontSize: 16 },
});
