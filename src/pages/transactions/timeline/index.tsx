import React, { useState } from "react";
import { ScrollView } from "react-native";
import TimelineItem from "../timlineItem";
import monthsName from "../monthsName.json";
import styles from "./styles";

const Timeline = () => {
  const months = monthsName.data;
  const [selected, setSelected] = useState(null);
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
