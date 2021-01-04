import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    width: width * 0.89,
    height: height * 0.75,
    justifyContent: "space-around",
  },
  chargePackageBox: {
    height: height * 0.51,
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
  inputBox: {
    width: width * 0.79,
    height: height * 0.1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  inputPack: {
    width: 165,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  inputBoxText: {
    fontSize: 20,
    color: "#00015d",
  },
  button: { width: width * 0.89, height: 44 },
  chargeBox:{
    height: 118,
    width: width * 0.85,
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  flatList:{
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: width * 0.85,
    height: "70%",
  },
  amountBox:{
    width: width * 0.21,
    marginLeft: "7%",
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  chargeTextAmount:{ fontSize: 16 }
});
