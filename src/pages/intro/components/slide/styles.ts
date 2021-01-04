import { StyleSheet } from "react-native";
import { colors, width, height } from "constants/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 3,
  },
  bottomSpace: {
    height: 51,
    backgroundColor: colors.white,
  },
  titleWrapper: {
    height: 158,
    justifyContent: "center",
    paddingTop: 30,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 18,
    color: colors.white,
    lineHeight: 30,
    textAlign: "center",
  },
  imageWrapper: {
    alignItems: "center",
    flex: 1,
  },
  image: {
    resizeMode: "contain",
    width: width - 104,
    height: "100%",
  },
  descriptionWrapper: {
    width: "95%",
    height: 106,
    alignSelf: "center",
    backgroundColor: "#ffffffee",
    borderRadius: 12,
    borderWidth: 0.3,
    borderColor: colors.gray700,
    position: "absolute",
    bottom: 15,
    zIndex: 10,
  },
  descriptionHead: {
    height: 40,
    padding: 10,
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  descriptionTitle: {
    fontSize: 13,
    color: colors.gray400,
    marginRight: 7,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: "left",
    paddingHorizontal: 15,
  },
});
