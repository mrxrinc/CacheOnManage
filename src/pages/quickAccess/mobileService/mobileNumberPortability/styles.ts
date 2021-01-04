import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    width: width * 0.89,
    height: height * 0.81,
    justifyContent: "space-around",
  },
  opratorBox: {
    height: height * 0.31,
    justifyContent: "space-between",
    marginBottom: "60%",
  },
  opratorPack: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  oprator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tickBox: {
    borderWidth: 1,
    borderColor: "#43e6c5",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  opratorName: { fontSize: 16, color: "#00015d" },
  button: { width: width * 0.89, height: 44 },
});
