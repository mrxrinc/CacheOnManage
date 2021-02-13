import { StyleSheet } from "react-native";
import { colors, iosBoxShadow } from "constants/index";

export default StyleSheet.create({
  content: {
    borderRadius: 15,
    backgroundColor: colors.white,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 20,
    elevation: 10,
    ...iosBoxShadow,
  },
  img: {
    width: 48,
    height: 48,
    marginRight: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 16,
  },
});
