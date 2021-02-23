import { StyleSheet } from "react-native";
import { colors } from "constants/index";
export default StyleSheet.create({
  selectChild: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  avatarCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 10,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: -9,
    left: -9,
    zIndex: 5,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 50,
    backgroundColor: colors.gray900,
    borderWidth: 0.5,
    borderColor: colors.gray800,
  },
  childName: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    color: colors.gray250,
  },
});
