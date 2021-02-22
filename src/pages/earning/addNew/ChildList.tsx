import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ChildItem from "./ChildItem";
const ChildList = (props: any) => {
  const { isChild, childInfo, onSelect, isFavorite } = props;
  const [selected, setSelected] = useState(null);

  return (
    <View style={styles.container}>
      {!isChild
        ? childInfo.map((item: any, index: any) => {
            return (
              <ChildItem
                onSelect={() => setSelected(item.id)}
                isFavorite={selected === item.id}
                key={index.toString()}
                item={item}
                index={index}
              />
            );
          })
        : null}
    </View>
  );
};

export default ChildList;
const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
});
