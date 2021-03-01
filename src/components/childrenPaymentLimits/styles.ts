import { StyleSheet } from "react-native";
import { colors, IOS } from "constants/index";

export default StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    color: colors.title,
  },
  itemsWrapper: {
    flex: 1,
    paddingTop: 30,
  },
  item: {
    height: 45,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemTitleWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 3,
    // marginTop: 20,
    lineHeight: 24,
  },
  itemDescription: {
    fontSize: 12,
    color: colors.gray600,
  },
  itemInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemInput: {
    width: 100,
    height: 35,
    marginRight: 10,
  },
  currencyUnit: {
    fontSize: 13,
    color: colors.gray600,
  },
  buttonWrapper: {
    padding: 20,
  },
  error: {
    color: "#e40046",
  },
});
