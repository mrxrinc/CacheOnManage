import { StyleSheet } from "react-native";
import { colors,width } from "constants/index";
export default StyleSheet.create({
imgWrapper:{
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
    color: "#515c6f",
    fontSize: 14,
    lineHeight: 22,
    marginLeft: 5,
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
    width: width * 0.89,
  },
  amount:{
      alignItems:'center',
      flexDirection:'row',
  },
  img:{ width: 32, height: 32 },
  selectedItem:{backgroundColor: colors.gray900,width: width,paddingHorizontal:20,marginTop:20}
})