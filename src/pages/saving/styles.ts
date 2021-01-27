import { colors } from "constants/index";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  savingInfoBox: {
    backgroundColor: colors.white,
    height: 92,
    width: "100%",
    padding: 10,
    marginTop: 15,
  },
  totalAmount: {
    textAlign: "center",
    fontSize: 32,
  },
  unit: {
    fontSize: 15,
  },
  weeklySavings: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 15,
  },
  targetBox: {
    width: "90%",
    borderRadius: 10,
    backgroundColor: colors.white,
    minHeight: 125,
    padding: 15,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 4,
  },
  targetTitle: {
    fontSize: 14,
  },
  halfWidth: {
    width: "50%",
  },

  alignLeft: {
    textAlign: "left",
  },
  buttonsWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 20,
  },
  button: {
    width: "48%",
    height: 44,
    borderRadius: 100,
  },
  loading:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
