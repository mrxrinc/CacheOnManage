import React, { useState, useRef, useEffect } from "react";
import { ScrollView } from "react-native";
import TimelineItem from "../timlineItem";
import monthsName from "../monthsName.json";
import styles from "./styles";
import { getTwoYearsDate } from "utils";
const Timeline = (props: any) => {
  const { onSelected } = props;
  const months = monthsName.data;
  const [selected, setSelected] = useState(null);
  const scrollViewRef = useRef<any>(null);

  useEffect(() => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
  }, []);
  console.log(selected);
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {getTwoYearsDate().map((item: any, index: any) => {
        return (
          <TimelineItem
            key={index.toString()}
            enable={
              selected !== null
                ? selected === index
                : index === getTwoYearsDate().length - 1
            }
            onSelected={(data: any) => {
              onSelected(data);
              setSelected(index);
            }}
            data={item}
            months={months}
          />
        );
      })}
    </ScrollView>
  );
};
export default Timeline;
