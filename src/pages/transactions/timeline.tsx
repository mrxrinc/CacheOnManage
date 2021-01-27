import { FormattedText } from "components/format-text";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import TimelineItem from "./timlineItem";
import monthsName from "./monthsName.json";

const Timeline = (props: any) => {
  const months = monthsName.data;
  const [selected, setSelected] = useState(null);
  // const isSelected = selected === data.id ? true : false;

  console.log(months);
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      style={styles.container}
    >
      {months.map((item: any) => {
        return (
          <TimelineItem
            enable={selected === item.id}
            onSelected={() => setSelected(item.id)}
            data={item}
            months={months}
          />
        );
      })}
    </ScrollView>
  );
};
export default Timeline;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: 8,
    maxHeight: 64,
  },
});
