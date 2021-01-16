import background from "components/background";
import { colors } from "constants/index";
import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    marginTop: 20,
  },
  title: {
    color: "#00015d",
    fontSize: 16,
    marginTop: 20,
  },
  submitButton: {
    height: 43,
    borderRadius: 30,
    backgroundColor: "#43e6c5",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  gray: {
    color: "#8b8b8b",
  },
  disabledButton: {
    backgroundColor: colors.disable,
  },
  submitButtonTitle: {
    color: "#fff",
  },
});
