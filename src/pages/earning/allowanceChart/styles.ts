import { StyleSheet } from "react-native";
import { width, height, colors } from "constants/index";

export default StyleSheet.create({
  container: {
    height: height * 0.35,
    justifyContent: "space-between",
    alignItems: "center",
    width: width,
    backgroundColor: "white",
    marginTop: 10,
  },
  content: {
    justifyContent: "space-around",
    alignItems: "center",
    height: "95%",
  },
  bigAmountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  chartUi: {
    width: width * 0.89,
    height: 12,
    borderRadius: 150,
    overflow: "hidden",
    flexDirection: "row",
    backgroundColor: colors.gray800,
    borderWidth: 0.5,
    borderColor: colors.gray700,
  },
  detailBox: {
    width: width * 0.89,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  detailContent: {
    width: "100%",
    paddingVertical: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailTextBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  detailText: {
    fontSize: 12,
    padding: 3,
    color: colors.gray250,
  },
  circleVector: {
    width: 16,
    height: 16,
    borderRadius: 30,
  },
  detailAmountText: {
    color: colors.gray550,
    fontSize: 14,
  },
});
