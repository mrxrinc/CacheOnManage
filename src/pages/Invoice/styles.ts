import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  item: {
    padding: 10,
    fontSize: 18,
    minHeight: 30,
  },
  itemBox: {
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "rgba(186, 239, 252, 0.5)",
    borderRadius: 5,
    marginBottom: 0,
  },

  itemRow: {
    flexDirection: "row",
    marginVertical: 2,
  },
  leftItem: { width: "50%", textAlign: "left" },
  rightItem: { width: "50%", textAlign: "right", fontSize: 15 },
  increase: {
    color: "#43e6c5",
  },
  decrease: {
    color: "#e30000",
  },
  separator: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#000",
  },
  rowViewContainer: {
    flex: 1,
    paddingRight: 15,
    paddingTop: 13,
    paddingBottom: 13,
    borderBottomWidth: 0.5,
    borderColor: "#c9c9c9",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 20,
    marginLeft: 10,
  },
  gray: {
    color: "#b4b4b4",
  },
  title: {
    fontSize: 18,
    color: "#000",
  },
  invoiceHedaer: {
    height: 40,
    backgroundColor: "#f4f6fa",
    justifyContent: "center",
    alignItems: "center",
  },
  invoiceTitle: {
    textAlign: "center",
    color: colors.blueDeep,
    fontSize: 16,
  },
  activityIndicator: {
    margin: 30,
  },
});
