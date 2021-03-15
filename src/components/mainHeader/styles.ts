import { StyleSheet } from "react-native";
import { colors, IOS } from "constants/index";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: 95,
    paddingTop: 25,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  menuWrapper: {
    width: 56,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  title: {
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    color: colors.white,
    marginLeft: -56,
  },
  backWrapper: {
    width: 56,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  cashAvatarWrapper: {
    flexDirection: "row",
    paddingRight: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: colors.gray700,
    borderWidth: 1,
    borderColor: colors.white,
    marginLeft: IOS ? 15 : 10,
  },
  amountWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  balance: {
    fontSize: 22,
    color: colors.white,
  },
  currency: {
    fontSize: 18,
    color: colors.white,
    marginLeft: 3,
  },
  childTitleWrapper: {
    width: "100%",
    height: 70,
    position: "absolute",
    bottom: 0,
    zIndex: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  childTitle: {
    fontSize: 20,
    color: colors.white,
  },
});
