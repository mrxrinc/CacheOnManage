import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardBox: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: height * 0.26,
    width: "70%",
    marginTop: "3%",
  },
  cardPack: {
    height: "40.8%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cardImg: { width: width * 0.83, height: height * 0.3, position: "absolute" },
  frontCardInfo: {
    color: "#fff",
    fontSize: 16,
  },
  cardInfoBox: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "98%",
    height: height * 0.2,
    marginTop: "10%",
    position: "absolute",
  },
  imagesCard: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  blueLogo: { width: 24, height: 35 },
  cardOwnerInfo: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userStateBox: {
    alignItems: "flex-end",
    width: "90%",
  },
});
