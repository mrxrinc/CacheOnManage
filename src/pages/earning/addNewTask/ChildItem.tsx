import React from "react";
import Column from "./column";

const ChildItem = (props: any) => {
  const { index, item, onSelect, isFavorite } = props;
  return (
    <Column
      onPress={onSelect}
      index={index}
      title={item}
      isFavorite={isFavorite}
    />
  );
};

export default ChildItem;
