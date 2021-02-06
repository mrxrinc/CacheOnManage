import { StyleSheet } from "react-native";
import { colors } from "constants/index";

export default StyleSheet.create({
	avatar: {
		width: 35,
		height: 35,
		borderRadius: 100,
		backgroundColor: colors.gray700,
		marginRight: 10,
		marginLeft: 20,
	},
	bluIcon: {
		width: 30,
		height: 30,
		marginRight: 20,
	},
	childInfoWrapper: {
		flexDirection: "row",
		paddingTop: 16,
		paddingBottom: 16,
		borderBottomColor: "rgba(175,175,175,0.2)",
		borderBottomWidth: 1,
		alignItems: "center",
		justifyContent: "space-between",
	},
	nameWrapper: {
		flexDirection: "row",
	},
	childNickName: {
		fontSize: 16,
		color: colors.title,
	},
});
