import React from "react";
import { View, Image } from "react-native";
import { FormattedText } from "components/format-text";
import Payment from "images/transactions/detailPayment.png";
import PaymentItem from "../paymentItem";
import styles from "./styles";
import Header from "components/header";
import Layout from "components/layout";
import { formatNumber } from "utils/index";

const DetailItem = (props: any) => {
  const {
    amount,
    balance,
    date,
    description,
    followupNumber,
    referenceId,
    terminalId,
  } = props.route.params.data;
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
            <FormattedText style={styles.title}>{description}</FormattedText>
          </View>
          <PaymentItem isRial title="مبلغ" detail={formatNumber(amount)} />
          <PaymentItem
            isRial
            title="مانده پس از تراکنش"
            detail={formatNumber(balance)}
          />
          <PaymentItem title="تاریخ و ساعت" detail={date} />
          <PaymentItem title="شماره پیگیری" detail={followupNumber} />
          <PaymentItem title="شماره مرجع" detail={referenceId} />
          <PaymentItem title="پایانه" detail={terminalId} />
        </View>
      </>
    </Layout>
  );
};
export default DetailItem;
