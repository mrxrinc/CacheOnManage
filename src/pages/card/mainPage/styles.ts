import { StyleSheet } from "react-native";
import { colors, width } from "constants/index";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  listSection: {
    borderTopStartRadius: 50,
    borderTopRightRadius: 50,
    marginTop: 16,
    backgroundColor: colors.gray900,
  },
  transactionHeader: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 27,
    paddingVertical: 16,
  },
  transactionHeaderText: { fontSize: 16, color: colors.title },
  moreButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  moreText: {
    color: colors.gray400,
    fontSize: 16,
  },
  showAllIcon: {
    marginTop: 3,
  },
  categoryTitleWrapper: {
    paddingHorizontal: 27,
    paddingBottom: 8,
  },
  categoryTitle: {
    color: colors.gray400,
    fontSize: 16,
  },
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
    backgroundColor: colors.gray900,
    paddingBottom:25,
  },
  itemsTouch: {
    justifyContent: "space-around",
    alignItems: "center",
    width: width * 0.89,
    height: 90,
    borderRadius: 10,
    backgroundColor: colors.white,
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
  dateInfo: {
    color: colors.gray550,
    fontSize: 14,
  },
  transactionItemArrow: {
    marginTop: 6,
    marginLeft: 5,
  },
});
