import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FormattedText } from "components/format-text";
import { withTheme } from "themeCore/themeProvider";
import { colors } from "constants/index";
import Checkbox from "components/checkbox";

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
      <Checkbox
        color={theme.ButtonGreenColor}
        disabled
        showActive={
          isCustom
            ? keyItem
              ? true
              : false
            : activityTask === keyItem
            ? true
            : false
        }
      />
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
