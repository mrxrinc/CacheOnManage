import { FormattedText } from "components/format-text";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "./styles";
const TimelineItem = (props: any) => {
  const { enable, data, onSelected } = props;
  return (
    <TouchableOpacity
      onPress={onSelected}
      activeOpacity={0.4}
      style={styles.container}
    >
      <View style={[styles.month, enable && styles.monthActive]}>
        <FormattedText
          style={[styles.monthText, enable && styles.monthTextActive]}
        >
          {data.name}
        </FormattedText>
      </View>
      <FormattedText
        fontFamily="Regular-FaNum"
        style={enable ? styles.yearActive : styles.year}
      >
        99
      </FormattedText>
    </TouchableOpacity>
  );
};
export default TimelineItem;
