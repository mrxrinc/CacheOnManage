import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  descriptionBox: {
    width: width * 0.89,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  descriptionText: {
    fontSize: 13,
    color: "#515c6f",
  },
  inquiryBox: {
    marginTop: "5%",
    flexDirection: "row",
    width: width * 0.89,
    justifyContent: "space-between",
  },
  inquiryPack: {
    flexDirection: "row",
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
  billType: { fontSize: 14, marginLeft: "4%" },
  amountPack: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  amountText: { fontSize: 16 },
  button: { width: width * 0.89, height: 44 },
});
