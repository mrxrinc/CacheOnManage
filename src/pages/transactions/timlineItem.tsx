import { FormattedText } from "components/format-text";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
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
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignSelf: "center",
  },
  month: {
    width: 67,
    borderRadius: 9,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  monthText: {
    color: "#110820",
    paddingTop: 2,
  },
  year: {
    fontSize: 14,
    color: "#110820",
  },
  yearActive: {
    color: "#307fe2",
    fontSize: 14,
  },
  monthActive: {
    backgroundColor: "#00afff",
  },
  monthTextActive: {
    color: "white",
  },
});
