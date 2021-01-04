import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentWrapper: {
    height: "93%",
    margin: 20,
    padding: 20,
    paddingHorizontal: 30,
    backgroundColor: colors.white,
    borderRadius: 15,
    elevation: 10,
  },
  title: {
    color: colors.title,
    fontSize: 16,
    paddingVertical: 25,
    textAlign: "center",
  },
  validatorRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  validatorText: {
    color: colors.title,
    marginLeft: 10,
  },

  rowWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  keyText: {
    fontSize: 14,
    color: colors.gray300,
    flexShrink: 0,
    backgroundColor: colors.white,
    zIndex: 1,
    paddingLeft: 10,
  },
  midLine: {
    width: "100%",
    position: "absolute",
    zIndex: 0,
    height: 1,
    backgroundColor: colors.gray800,
  },
  valueTextWrapper: {
    flexDirection: "row",
    backgroundColor: colors.white,
    alignItems: "flex-end",
  },
  valueText: {
    flexShrink: 0,
    paddingRight: 10,
    zIndex: 1,
    fontSize: 14,
    color: colors.gray300,
  },
  description: {
    color: colors.title,
    fontSize: 14,
    textAlign: "center",
    marginVertical: 10,
    lineHeight: 25,
  },
  buttonsWrapper: {
    paddingVertical: 20,
  },
});
