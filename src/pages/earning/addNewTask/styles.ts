import { StyleSheet } from "react-native";
import { colors, width } from "constants/index";
export default StyleSheet.create({
    container: {
      justifyContent: "space-between",
      flexGrow: 1,      
      alignItems: 'center',
    },
    textInputBox: {
      width: width * 0.89,
      height: 69,
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
      alignSelf:'center',
    },
    plusIcon: {
      color: colors.gray600,
      transform: [{ scale: 1 }],
      right: 27,
    },

    earningBox: {
      width: width * 0.89,
      flexDirection: "row",
      alignItems: "center",
      marginTop: 20,
      justifyContent: "space-between",
    },
    earningText: {
      color: "#333333",
      fontSize: 20,
    },
    TextInput: {
      backgroundColor: colors.gray900,
      height: 45,
      fontSize: 20,
      color: "black",
      width: 149,
      borderRadius: 10,
      textAlign: "center",
      paddingBottom: 4,
      lineHeight: 31,
      fontFamily: "IRANSansMobileFaNum",
    },
    earningTextInputBox: {
      flexDirection: "row",
      alignItems: "center",
    },
    unitText: {
      color: "#00015d",
      fontSize: 16,
      marginLeft: 6,
    },
    factorWrapper: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 25,
    },
    factorText: {
      fontSize: 12,
      color: colors.title,
      lineHeight: 18,
    },
    selected: { backgroundColor: "red" },
    list: {
      paddingVertical: 5,
      margin: 3,
      flexDirection: "row",
      backgroundColor: "blue",
      justifyContent: "flex-start",
      alignItems: "center",
      zIndex: -1,
    },
    activityText: {
      color: "#515c6f",
      fontSize: 14,
      marginLeft: 5,
    },
    activityButton: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    recurringCheckbox: {
      width: 20,
      height: 20,
      borderWidth: 1,
      borderColor: colors.buttonSubmitActive,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    addToPopularList: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      marginTop: 25,
      marginBottom: 22,
      paddingVertical: 5,
      paddingHorizontal: 20,
      backgroundColor: colors.gray900,
    },
    buttonWrapper: {
      width: "90%",
      paddingHorizontal: 20,
      alignSelf:'center',
      marginVertical:20,
    },
    content:{
      flex:1,
    },
  });