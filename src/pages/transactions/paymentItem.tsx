import React from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import BackIcon from "components/icons/back.svg";
import { FormattedText } from "components/format-text";
import Header from "./header";
import Payment from "images/transactions/detailPayment.png";

const PaymentItem = (props: any) => {
  const { title, detail, isRial } = props;
  return (
    <View style={styles.item}>
      <FormattedText style={styles.itemTitle}>{title}</FormattedText>
      <View style={styles.line} />
      <FormattedText style={styles.itemPayment} fontFamily="Regular-FaNum">
        {detail}
        <FormattedText style={styles.rial}>{isRial && "ریال"}</FormattedText>
      </FormattedText>
    </View>
  );
};
export default PaymentItem;
const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    marginBottom: 20,
  },
  itemTitle: {
    fontSize: 16,
    color: "#110820",
  },
  line: {
    borderStyle: "dashed",
    borderWidth: 0.6,
    borderColor: "#c9cbcc",
    height: 0.1,
    flex: 1,
    alignSelf: "center",
    marginHorizontal: 17.5,
    marginTop: 5,
  },
  itemPayment: {
    fontSize: 16,
    color: "#110820",
  },
  rial: {
    fontSize: 14,
  },
});
