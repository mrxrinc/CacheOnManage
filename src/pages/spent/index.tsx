import React, { FC, useState, useEffect } from "react";
// Libraries
import moment from "moment-jalaali";
//Helpers & Utils
import { persianDigits, formatNumber } from "utils";
//Services
import { getDebit } from "utils/api";
//Types
import { InvoiceData } from "constants/types";
//Shared Components
import Layout from "components/layout";
import Header from "components/header";
import EmptyComponent from "components/emptyComponent";
// UI Frameworks
import { View, SectionList, ActivityIndicator } from "react-native";
import { FormattedText } from "components/format-text";
import { RootState } from "../../../customType";
import { useDispatch, useSelector } from "react-redux";
// Styles
import styles from "./styles";

const Invoice: FC = (props: any) => {
  const childId = props.route.params?.childId;
  const [refinedData, setRefinedData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const token = useSelector<RootState, any>((state) => state.user.token);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await getDebit(token, childId);
      const currentDate = moment();
      const filteredCurrentWeekData = data.filter((date: InvoiceData) =>
        moment(date.date).isSame(currentDate, "week")
      );
      const filteredOthersData = data.filter(
        (date: InvoiceData) => !moment(date.date).isSame(currentDate, "week")
      );
      if (data) {
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
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      setLoading(false);
      console.warn("ERROR ON GETTING CHILD SPENT DATA: ", error.response);
    }
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
          >
            {formatNumber(item.amount)} ریال
            {item.withdraw ? " + " : " - "}
          </FormattedText>
        </View>
        <View style={styles.itemRow}>
          <FormattedText style={[styles.leftItem, styles.gray]}>
            {date}
          </FormattedText>
          <FormattedText style={[styles.rightItem, styles.gray]}>
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
        staticTitle={"spent"}
        handleBack={() => props.navigation.goBack()}
      />
      <View style={[styles.container]}>
        {loading ? (
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
