import { FormattedText } from "components/format-text";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import PaymentIn from "components/icons/payment-in.svg";
import More from "components/icons/more-payment.svg";
import styles from "./styles";
import PaymentOut from "components/icons/payment-out.svg";
import { formatNumber } from "utils/index";

const Item = (props: any) => {
  const { amount, balance, date, description, type } = props.data.item;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("detailItem", { data: props.data.item })
      }
      activeOpacity={0.8}
      style={styles.container}
    >
      {type == "DEPOSIT" ? <PaymentIn /> : <PaymentOut />}
      <View style={styles.title}>
        <FormattedText style={styles.titleText}>{description}</FormattedText>
        <FormattedText style={styles.titleTime} fontFamily="Regular-FaNum">
          {date}
        </FormattedText>
      </View>
      <View style={styles.payment}>
        <FormattedText style={styles.paymentTop} fontFamily="Regular-FaNum">
          {formatNumber(amount)}
          {type == "DEPOSIT" ? " + " : " - "}ریال
        </FormattedText>
        <FormattedText style={styles.paymentBottom} fontFamily="Regular-FaNum">
          {formatNumber(balance)} ریال
        </FormattedText>
      </View>
      <More />
    </TouchableOpacity>
  );
};
export default Item;
