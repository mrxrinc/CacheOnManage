import { StyleSheet } from "react-native";
import { colors, width } from "constants/index";
export default StyleSheet.create({
  imgWrapper: {
    width: 32,
    height: 32,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.gray950,
  },
  arrowIcon: {
    color: colors.buttonOpenActive,
    transform: [{ scale: 1.4 }],
    marginHorizontal: 5,
    marginTop: 5,
  },
  taskText: {
    color: colors.eggplant,
    fontSize: 16,
    lineHeight: 22,
    marginLeft: 6,
  },
  taskNameBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskCotainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
  amount: {
    alignItems: "center",
    flexDirection: "row",
  },
  img: { width: 32, height: 32 },
  selectedItem: {
    backgroundColor: colors.gray900,
    paddingHorizontal: 20,
    height: 50,
    marginHorizontal: -20,
  },
  activeItem: {
    backgroundColor: colors.clearBlue5,
    borderRadius: 10,
  },
  rial: {
    color: colors.brownishGrey,
    fontSize: 16,
    marginLeft: 5,
  },
});
