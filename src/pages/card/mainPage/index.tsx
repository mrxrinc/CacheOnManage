import { fromPairs } from "ramda";
import React from "react";
import { View } from "react-native";
import ChildCard from "./childCard";
import CardItems from "./cardItems";
import CardTransactions from "./cardTransactions";

const MainPage = (props: any) => {
  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
      <ChildCard cardsInfo={props.cardsInfo} />
      <CardItems cardsInfo={props.cardsInfo} />
      <CardTransactions cardsInfo={props.cardsInfo} />
    </View>
  );
};

export default MainPage;
