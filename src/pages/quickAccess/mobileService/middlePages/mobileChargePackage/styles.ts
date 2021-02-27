import { colors } from "constants/index";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
  },
  chargePackageBox: {
    height: height * 0.51,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  descriptionBox: {
    width: width * 0.89,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  descriptionText: {
    fontSize: 13,
    color: "#515c6f",
  },
  inputBox: {
    width: width * 0.89,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },

  inputPack: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputBoxText: {
    fontSize: 20,
    color: colors.title,
    flex:1,
    textAlign: 'left',
  },
  rial:{
    fontSize: 16,
    color: colors.title,
  },
  button: {
    width: width * 0.89,
    height: 44,
    alignSelf: "center",
    marginVertical: 20,
  },
  chargeBox: {
    height: 118,
    width: width * 0.85,
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  flatList: { marginTop: 25, flex: 1, width: width * 0.8 },
  flatListContent: {},
  amountBox: {
    width: width * 0.21,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  chargeTextAmount: { fontSize: 16 },
  input:{
    height: 44,
    width: 150,
    borderRadius: 8,
    backgroundColor: colors.gray900,
    fontFamily: "IRANSansMobileFaNum",
    textAlign: "center",
    marginRight: 8,
  },
});
