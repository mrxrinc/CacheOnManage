import { StyleSheet } from "react-native";
import { colors, width } from "constants/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fa",
    width: width,
    borderTopStartRadius: 50,
    borderTopRightRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  transactionHeader: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: width * 0.89,
    marginTop: "3%",
  },
  transactionHeaderText: { fontSize: 16, color: colors.title },
  moreButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  moreText: { color: "#707070", fontSize: 16 },
  itemsContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: 95,
    borderRadius: 10,
    marginBottom: "4%",
  },
  flatList: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.93,
  },
  itemsTouch: {
    justifyContent: "space-around",
    alignItems: "center",
    width: width * 0.89,
    height: 90,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 5,
  },
  cardBox: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: width * 0.85,
  },
  sidePack: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dateInfo: { color: "#8d8b8b", fontSize: 14 },
});
