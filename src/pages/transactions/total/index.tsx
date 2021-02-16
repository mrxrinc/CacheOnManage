import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import Item from "../item";
import Timeline from "../timeline";
import Header from "components/header";
import Layout from "components/layout";
import styles from "./styles";
import EmptyComponent from "components/emptyComponent";
import { getTransactions } from "utils/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../../customType";
import moment from "moment-jalaali";

const Total = (props: any) => {
  const { childInfo } = props.route.params;
  const currentMonth = moment().format("jYYYY/jM");
  const [isLoading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(currentMonth);
  const token = useSelector<RootState, any>((state) => state.user.token);

  const getTransactionData = (date: any = selectedDate) => {
    setLoading(true);
    setTransactions([]);
    const data = {
      childId: childInfo.childId,
      currentWeek: false,
      date: date,
    };
    getTransactions(token, data)
      .then((result) => {
        console.log(result);
        setTransactions(result.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        throw error;
      });
  };

  useEffect(() => {
    getTransactionData();
  }, []);

  return (
    <Layout>
      <>
        <Header
          staticTitle={"transactions.total"}
          handleBack={() => props.navigation.goBack()}
        />
        <Timeline
          onSelected={(data: any) => {
            setSelectedDate(data);
            getTransactionData(data);
          }}
        />
        <FlatList
          style={styles.content}
          contentContainerStyle={
            transactions.length > 0 && styles.contentFlatList
          }
          data={transactions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item) => <Item data={item} />}
          ListEmptyComponent={
            isLoading ? null : <EmptyComponent text={"تراکنشی وجود ندارد"} />
          }
          refreshing={isLoading}
          onRefresh={() => getTransactionData()}
        />
      </>
    </Layout>
  );
};
export default Total;
