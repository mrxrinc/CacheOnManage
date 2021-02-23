import React from "react";
import { StyleSheet, View } from "react-native";
import ChildItem from "./ChildItem";
const ChildList = (props: any) => {
  const { isChild, childInfo, childSelected, onSelect } = props;
  return (
    <View style={styles.container}>
      {!isChild
        ? childInfo.map((item: any, index: any) => {
            return (
              <ChildItem
                onSelect={onSelect}
                isFavorite={childSelected.find(
                  (data: any) => data.id == item.id
                )}
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
    justifyContent: "space-between",
  },
});
