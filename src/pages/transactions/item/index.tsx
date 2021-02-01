import { FormattedText } from "components/format-text";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import PaymentIn from "components/icons/payment-in.svg";
import More from "components/icons/more-payment.svg";
import styles from "./styles";

const Item = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("detailItem")}
      activeOpacity={0.8}
      style={styles.container}
    >
      <PaymentIn />
      <View style={styles.title}>
        <FormattedText style={styles.titleText}>
          برداشت از خودپرداز
        </FormattedText>
        <FormattedText style={styles.titleTime} fontFamily="Regular-FaNum">
          99/4/9{"  "}12:30
        </FormattedText>
      </View>
      <View style={styles.payment}>
        <FormattedText style={styles.paymentTop} fontFamily="Regular-FaNum">
          5,000,000 - ریال
        </FormattedText>
        <FormattedText style={styles.paymentBottom} fontFamily="Regular-FaNum">
          12,250,663 - ریال
        </FormattedText>
      </View>
      <More />
    </TouchableOpacity>
  );
};
export default Item;
