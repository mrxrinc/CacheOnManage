import { colors } from "constants/index";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  buttonsWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 20,
  },
  buttonBox: {
    width: "48%",
    height: 44,
    backgroundColor: "#fff",
    borderRadius: 100,
  },
});
