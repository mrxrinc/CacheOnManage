import React from "react";
import { View, StyleSheet } from "react-native";
import ChildList from "./ChildList";
import EarningBox from "./EarningBox";
import ToggleOptions from "./ToggleOptions";

const DetailTask = (props: any) => {
  const {
    isVisible,
    amount,
    setAmount,
    isChild,
    childInfo,
    onceActivityTask,
    setOnceActivityTask,
    weeklyActivityTask,
    setWeeklyActivityTask,
    isDefaultTask,
    setCustomDefault,
    customDefault,
    onSelect,
    childSelected,
    onChangeText,
    onLayout,
    factorCheck,
    theme,
  } = props;
  return (
    <View style={styles.container}>
      {isVisible && (
        <>
          <EarningBox
            onChangeText={onChangeText}
            onLayout={onLayout}
            setAmount={setAmount}
            amount={amount}
            factorCheck={factorCheck}
            theme={theme}
          />
          <ChildList
            childSelected={childSelected}
            onSelect={onSelect}
            childInfo={childInfo}
            isChild={isChild}
          />
          <ToggleOptions
            isChild={isChild}
            isDefaultTask={isDefaultTask}
            onceActivityTask={onceActivityTask}
            setOnceActivityTask={setOnceActivityTask}
            weeklyActivityTask={weeklyActivityTask}
            setWeeklyActivityTask={setWeeklyActivityTask}
            setCustomDefault={setCustomDefault}
            customDefault={customDefault}
          />
        </>
      )}
    </View>
  );
};

export default DetailTask;
const styles = StyleSheet.create({
  container: { marginBottom: 20 },
});
