import React, { FC, useState, useEffect } from "react";
// Libraries
import moment from "moment-jalaali";
//Helpers & Utils
import { formatNumber } from "utils";
//Types
import { InvoiceData } from "constants/types";
import { StateNetwork } from "store/index.reducer";
import { InvoiceState } from "store/Invoice/invoice.reducer";
// Actions
import InvoiceActions from "store/Invoice/invoice.actions";
//Shared Components
import Layout from "components/layout";
import Header from "components/header";
import EmptyComponent from "components/emptyComponent";
// UI Frameworks
import { View, SectionList, ActivityIndicator } from "react-native";
import { FormattedText } from "components/format-text";
import { useDispatch, useSelector } from "react-redux";
// Styles
import styles from "./styles";

const Invoice: FC = (props: any) => {
  const dispatch = useDispatch();

  const [refinedData, setRefinedData] = useState<any>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Store
  const invoiceState = useSelector<StateNetwork, InvoiceState>(
    (state) => state.invoice
  );

  useEffect(() => {
    dispatch(InvoiceActions.getInvoiceList({}, { sagas: true }));
  }, []);

  const getData = async () => {
    const currentDate = moment();

    const filteredCurrentWeekData = invoiceState.invoiceList.filter(
      (date: InvoiceData) => moment(date.date).isSame(currentDate, "week")
    );
    const filteredOthersData = invoiceState.invoiceList.filter(
      (date: InvoiceData) => !moment(date.date).isSame(currentDate, "week")
    );
    if (invoiceState.invoiceList) {
      setRefinedData([
        {
          title: "هفته جاری",
          data: filteredCurrentWeekData,
        },
        {
          title: "سایر تراکنش ها",
          data: filteredOthersData,
        },
      ]);
    }
    setRefreshing(false);
  };

  const pullToRefresh = () => {
    setRefreshing(true);
    getData();
  };

  function convertEpotchToDate(date: number) {
    var d = new Date(date);
    const convertDate =
      d.getFullYear() +
      "-" +
      ("00" + (d.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + d.getDate()).slice(-2) +
      " " +
      ("00" + d.getHours()).slice(-2) +
      ":" +
      ("00" + d.getMinutes()).slice(-2);
    const formatedDate = moment(convertDate, "YYYY-M-D HH:mm:ss").format(
      "jYYYY/jM/jD HH:mm"
    );
    return formatedDate;
  }

  function renderInvoice(item: any) {
    const date = convertEpotchToDate(item.date);
    return (
      <View style={styles.itemBox} key={item.title}>
        <View style={styles.itemRow}>
          <FormattedText style={[styles.leftItem, styles.title]}>
            {item.title}
          </FormattedText>
          <FormattedText
            style={[
              styles.rightItem,
              [item.withdraw ? styles.increase : styles.decrease],
            ]}
            fontFamily="Regular-FaNum"
          >
            {formatNumber(item.amount)}
            {item.withdraw ? " + " : " - "} ریال
          </FormattedText>
        </View>
        <View style={styles.itemRow}>
          <FormattedText
            style={[styles.leftItem, styles.gray]}
            fontFamily="Regular-FaNum"
          >
            {date}
          </FormattedText>
          <FormattedText
            style={[styles.rightItem, styles.gray]}
            fontFamily="Regular-FaNum"
          >
            {formatNumber(item.remainingAmount)}
            <FormattedText> ریال </FormattedText>
          </FormattedText>
        </View>
      </View>
    );
  }

  return (
    <Layout>
      <Header
        staticTitle={"invoice"}
        handleBack={() => props.navigation.goBack()}
      />
      <View style={[styles.container]}>
        {invoiceState.loading ? (
          <View style={styles.activityIndicator}>
            <ActivityIndicator />
          </View>
        ) : (
          <SectionList
            sections={refinedData}
            keyExtractor={(item, index) => item + index}
            onRefresh={pullToRefresh}
            refreshing={refreshing}
            renderItem={({ item }) => renderInvoice(item)}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.invoiceHedaer}>
                <FormattedText style={styles.invoiceTitle}>
                  {title}
                </FormattedText>
              </View>
            )}
            renderSectionFooter={() => <View style={{ height: 20 }} />}
            ListEmptyComponent={() => (
              <EmptyComponent text="هیج موردی یافت نشد!" />
            )}
          />
        )}
      </View>
    </Layout>
  );
};

export default Invoice;
