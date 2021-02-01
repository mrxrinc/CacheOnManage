import React from "react";
import { View, Image } from "react-native";
import { FormattedText } from "components/format-text";
import Payment from "images/transactions/detailPayment.png";
import PaymentItem from "../paymentItem";
import styles from "./styles";
import Header from "components/header";
import Layout from "components/layout";
const DetailItem = (props: any) => {
  return (
    <Layout>
      <>
        <Header
          staticTitle={"transactions.detailItem"}
          handleBack={() => props.navigation.goBack()}
        />
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
      </>
    </Layout>
  );
};
export default DetailItem;
