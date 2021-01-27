import React from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import BackIcon from "components/icons/back.svg";
import { FormattedText } from "components/format-text";
import Header from "./header";
import Payment from "images/transactions/detailPayment.png";
import PaymentItem from "./paymentItem";

const DetailItem = (props: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="جزئیات تراکنش" />
      <View style={styles.content}>
        <View style={styles.header}>
          <Image style={styles.img} source={Payment} />
          <FormattedText style={styles.title}>خرید از فروشگاه</FormattedText>
        </View>
        <PaymentItem isRial title="مبلغ" detail="2,560,000" />
        <PaymentItem isRial title="مانده پس از تراکنش" detail="12,000,000" />
        <PaymentItem title="تاریخ و ساعت" detail="99/04/28  22:30" />
        <PaymentItem title="شماره کارت" detail="6219-8610-1234-5678" />
        <PaymentItem title="شماره پیگیری" detail="2060271869" />
        <PaymentItem title="شماره مرجع" detail="2060271869" />
        <PaymentItem title="پایانه" detail="2060271869" />
      </View>
    </SafeAreaView>
  );
};
export default DetailItem;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  content: {
    borderRadius: 15,
    backgroundColor: "white",
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 15,
    shadowOpacity: 1,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 20,
  },
  img: {
    width: 48,
    height: 48,
    marginRight: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 16,
  },
});
