import React from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import ChildCard from "./childCard";
import CardItems from "./cardItems";
import { FormattedText } from "components/format-text";
import Arrow from "images/cards/mainPage/move.svg";
import Deposit from "images/cards/mainPage/deposit.svg";
import Withdrawal from "images/cards/mainPage/withDrawal.svg";
import { formatNumber } from "utils/index";
import styles from "./styles";
import Item from "pages/transactions/item";
const MainPage = (props: any) => {

  const {data} = props;

  const renderListHead = () => (
    <>
      <ChildCard cardsInfo={props.cardsInfo} />
      <CardItems cardsInfo={props.cardsInfo} />

      <View style={styles.listSection}>
        <View style={styles.transactionHeader}>
          <FormattedText
            fontFamily="Medium"
            style={styles.transactionHeaderText}
          >
            تراکنش ها
          </FormattedText>
          <TouchableOpacity style={styles.moreButton}>
            <FormattedText style={styles.moreText}>مشاهده همه</FormattedText>
            <Arrow style={styles.showAllIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.categoryTitleWrapper}>
          <FormattedText style={styles.categoryTitle}>هفته جاری</FormattedText>
        </View>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatList}
        data={data}
        renderItem={(item) => <Item data={item} />}
        ListHeaderComponent={() => renderListHead()}
        ListHeaderComponentStyle={{ backgroundColor: "white" }}
      />
    </View>
  );
};

export default MainPage;
