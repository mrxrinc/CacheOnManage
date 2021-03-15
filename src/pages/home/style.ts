import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: colors.gray900,
  },
  remainingDaysWrapper: {
    height: 30,
    paddingTop: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  remainingDays: {
    fontSize: 14,
    color: colors.primary,
  },
  buttonsWrapper: {
    width: "100%",
    height: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  button: {
    width: "48.5%",
    height: 44,
    elevation: 5,
  },
  list: {
    width: "100%",
    alignItems: "center",
  },
  listFooter: {
    height: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
