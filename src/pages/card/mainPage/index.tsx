import { fromPairs } from "ramda";
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
// import CardTransactions from "./cardTransactions";

const MainPage = (props: any) => {
  const cardInfo = props.cardsInfo;

  const transactionItems = (item: any) => {
    const data = item.item;
    return (
      <View style={styles.itemsContainer}>
        <TouchableOpacity style={styles.itemsTouch}>
          <View style={styles.cardBox}>
            <View style={styles.sidePack}>
              <View style={{ marginRight: "7%" }}>
                {data.type == "DEPOSIT" ? <Deposit /> : <Withdrawal />}
              </View>
              <View>
                <FormattedText>{data.description}</FormattedText>
                <FormattedText
                  fontFamily="Regular-FaNum"
                  style={styles.dateInfo}
                >
                  {data.date}
                </FormattedText>
              </View>
            </View>
            <View style={styles.sidePack}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <FormattedText
                  style={{
                    color: data.type == "DEPOSIT" ? "#23d660" : "#e30000",
                    fontSize: 14,
                  }}
                  fontFamily="Regular-FaNum"
                >
                  {formatNumber(data.amount)}
                  {data.type == "DEPOSIT" ? " + " : " - "}
                  ریال
                </FormattedText>
                <FormattedText
                  fontFamily="Regular-FaNum"
                  style={{ color: "#8d8b8b", fontSize: 14 }}
                >
                  {formatNumber(cardInfo.balance)} ریال
                </FormattedText>
              </View>
              <Arrow
                width={16}
                height={16}
                style={styles.transactionItemArrow}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

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
        data={cardInfo.transactions}
        renderItem={(item) => transactionItems(item)}
        ListHeaderComponent={() => renderListHead()}
        ListHeaderComponentStyle={{ backgroundColor: "white" }}
      />
    </View>
  );
};

export default MainPage;
