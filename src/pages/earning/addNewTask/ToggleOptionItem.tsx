import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FormattedText } from "components/format-text";
import Tick from "components/icons/tick.svg";
import { withTheme } from "themeCore/themeProvider";
import { colors } from "constants/index";

const ToggleOptionItem = (props: any) => {
  const {
    activityTask,
    setActivityTask,
    title,
    keyItem,
    style,
    isCustom,
  } = props;
  const theme = props.theme;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={setActivityTask}
      style={[styles.activityButton, style]}
    >
      <View
        style={[
          styles.recurringCheckbox,
          {
            backgroundColor: isCustom
              ? keyItem
                ? theme.ButtonGreenColor
                : "white"
              : activityTask === keyItem
              ? theme.ButtonGreenColor
              : "white",
            borderColor: theme.ButtonGreenColor,
          },
        ]}
      >
        <Tick width={14} height={14} fill={"white"} />
      </View>

      <FormattedText id={title} style={styles.activityText} />
    </TouchableOpacity>
  );
};
export default withTheme(ToggleOptionItem);

const styles = StyleSheet.create({
  activityText: {
    color: colors.text,
    fontSize: 14,
    marginLeft: 5,
    // paddingVertical: 0,
  },
  activityButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
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
});
