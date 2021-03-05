import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { FormattedText } from "components/format-text";
import { colors } from "constants/index";

const TaskName = (props: any) => {
  const { taskName, icon } = props;
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `data:image/png;base64, ${icon}` }}
        style={styles.icon}
      />
      <FormattedText fontFamily="Medium" style={styles.name}>
        {taskName}
      </FormattedText>
    </View>
  );
};
export default TaskName;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 16,
  },
  name: {
    fontSize: 16,
    fontFamily: colors.eggplant,
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 6,
  },
});
