import React from "react";
import { StyleSheet, View } from "react-native";
import ToggleOptionItem from "./ToggleOptionItem";
import { colors } from "constants/index";

const ToggleOptions = (props: any) => {
  const {
    onceActivityTask,
    setOnceActivityTask,
    weeklyActivityTask,
    setWeeklyActivityTask,
    isDefaultTask,
    setCustomDefault,
    customDefault,
    isChild,
  } = props;
  return (
    <View style={styles.container}>
      <ToggleOptionItem
        keyItem={"ONCE"}
        activityTask={onceActivityTask}
        setActivityTask={setOnceActivityTask}
        title={"earning.justOnceActivity"}
      />
      <ToggleOptionItem
        keyItem={"WEEKLY"}
        activityTask={weeklyActivityTask}
        setActivityTask={setWeeklyActivityTask}
        title={"earning.weeklyActivity"}
      />
      {!isDefaultTask && !isChild && (
        <ToggleOptionItem
          isCustom
          keyItem={customDefault}
          activityTask={customDefault}
          setActivityTask={setCustomDefault}
          title={"earning.weeklyActivity"}
          style={styles.customToggle}
        />
      )}
    </View>
  );
};

export default ToggleOptions;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "flex-start",
  },
  customToggle: {
    backgroundColor: colors.gray900,
    justifyContent: "flex-start",
    height: 40,
    alignSelf: "stretch",
    marginHorizontal: -20,
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
