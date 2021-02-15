import { FormattedText } from "components/format-text";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "./styles";
const TimelineItem = (props: any) => {
  const { enable, onSelected, months } = props;
  const { year, month } = props.data;
  const currentMonth = months.find((item: any) => item.id === Number(month))
    .name;

  return (
    <TouchableOpacity
      onPress={() => onSelected(year + "/" + month)}
      activeOpacity={0.4}
      style={styles.container}
    >
      <View style={[styles.month, enable && styles.monthActive]}>
        <FormattedText
          style={[styles.monthText, enable && styles.monthTextActive]}
        >
          {currentMonth}
        </FormattedText>
      </View>
      <FormattedText
        fontFamily="Regular-FaNum"
        style={enable ? styles.yearActive : styles.year}
      >
        {year}
      </FormattedText>
    </TouchableOpacity>
  );
};
export default TimelineItem;
