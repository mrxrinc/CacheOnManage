import { FormattedText } from "components/format-text";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import PaymentIn from "components/icons/payment-in.svg";
import PaymentOut from "components/icons/payment-out.svg";
import More from "components/icons/more-payment.svg";
import { formatNumber, convertEpotchToDate } from "utils";
import styles from "./styles";

const Item = (props: any) => {
  const { amount, date, remainingAmount, title, withdraw } = props.data;
  const dateConvert = convertEpotchToDate(date);
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container}>
      {withdraw ? <PaymentIn /> : <PaymentOut />}
      <View style={styles.title}>
        <FormattedText style={styles.titleText}>{title}</FormattedText>
        <FormattedText style={styles.titleTime} fontFamily="Regular-FaNum">
          {dateConvert}
        </FormattedText>
      </View>
      <View style={styles.payment}>
        <FormattedText
          style={[styles.paymentTop, withdraw && styles.paymentIn]}
          fontFamily="Regular-FaNum"
        >
          {formatNumber(amount)}
          {withdraw ? " + " : " - "}ریال
        </FormattedText>
        <FormattedText style={styles.paymentBottom} fontFamily="Regular-FaNum">
          {formatNumber(remainingAmount)} ریال
        </FormattedText>
      </View>
      <More />
    </TouchableOpacity>
  );
};
export default Item;
