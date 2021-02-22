import { colors } from "constants/index";
import { fontFamily, fontSize } from "global";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Tick from "components/icons/tick.svg";

const StepCircle = (props: any) => {
  const { isWorking, completed, disable, title } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {isWorking && <View style={styles.isWorking} />}
      {disable && <View style={styles.disable} />}
      {completed && (
        <View style={styles.completed}>
          <Tick fill={colors.white} style={styles.completedIcon} />
        </View>
      )}
    </View>
  );
};
export default StepCircle;
const styles = StyleSheet.create({
  container: {
    paddingRight: 4,
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  isWorking: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 1,
    borderColor: colors.cornflowerBlue,
  },
  disable: {
    width: 6,
    height: 6,
    backgroundColor: colors.yellowOrange,
    borderRadius: 3,
    marginLeft: 4,
  },
  title: {
    fontFamily: fontFamily.yekanNormal,
    fontSize: fontSize.large,
    fontWeight: "normal",
    color: colors.dark,
    marginLeft: 8,
  },
  completed: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.cornflowerBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  completedIcon: {
    width: 9,
    height: 9,
  },
});
