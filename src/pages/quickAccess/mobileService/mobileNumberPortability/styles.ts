import { colors } from "constants/index";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: "space-between",
    flexGrow: 1,
  },
  opratorBox: {
    width: width * 0.89,
    alignSelf: 'center',
  },
  opratorPack: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  oprator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tickBox: {
    borderWidth: 1,
    borderColor: "#43e6c5",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  opratorName: { fontSize: 16, color: colors.title, marginVertical: 20 },
  button: { width: width * 0.89, height: 44, marginVertical: 20,alignSelf: 'center' },
});
