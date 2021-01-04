import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    color: colors.title,
    fontSize: 14,
    paddingVertical: 20,
  },
  validatorRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  validatorText: {
    color: colors.title,
    marginLeft: 10,
  },
});
