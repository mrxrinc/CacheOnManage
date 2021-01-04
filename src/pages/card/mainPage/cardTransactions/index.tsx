import React from "react";
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FormattedText } from "components/format-text";
import Move from "images/cards/mainPage/move.svg";
import styles from "./styles";
import Deposit from "images/cards/mainPage/deposit.svg";
import Withdrawal from "images/cards/mainPage/withDrawal.svg";
import { formatNumber } from "utils/index";

const { width } = Dimensions.get("window");
const CardTransactions = (props: any) => {
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
              <Move width={24} height={24} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.transactionHeader}>
          <FormattedText
            fontFamily="Medium"
            style={styles.transactionHeaderText}
          >
            تراکنش ها
          </FormattedText>
          <TouchableOpacity style={styles.moreButton}>
            <FormattedText style={styles.moreText}>مشاهده همه</FormattedText>
            <Move />
          </TouchableOpacity>
        </View>
        <View style={{ width: width * 0.89 }}>
          <FormattedText style={{ color: "#707070", fontsize: 16 }}>
            هفته جاری
          </FormattedText>
        </View>
        <FlatList
          contentContainerStyle={styles.flatList}
          data={cardInfo.transactions}
          renderItem={(item) => transactionItems(item)}
        />
      </ScrollView>
    </View>
  );
};
export default CardTransactions;
