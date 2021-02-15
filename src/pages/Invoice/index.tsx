import React, { FC, useState, useEffect } from "react";
import moment from "moment-jalaali";
import { InvoiceData } from "constants/types";
import { StateNetwork } from "store/index.reducer";
import { InvoiceState } from "store/Invoice/invoice.reducer";
import InvoiceActions from "store/Invoice/invoice.actions";
import Layout from "components/layout";
import Header from "components/header";
import EmptyComponent from "components/emptyComponent";
import { View, SectionList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import Item from "pages/transactions/item";
import SectionFooter from "pages/spend-parent/sectionFooter";
import SectionHeader from "pages/spend-parent/sectionHeader";
interface Props {
  navigation: any;
}

const Invoice: FC<Props> = (props) => {
  const dispatch = useDispatch();

  const [refinedData, setRefinedData] = useState<any>([]);

  // Store
  const invoiceState = useSelector<StateNetwork, InvoiceState>(
    (state) => state.invoice
  );

  useEffect(() => {
    dispatch(InvoiceActions.getInvoiceList({}, { sagas: true }));
  }, []);

  useEffect(() => {
    getData();
  }, [invoiceState.invoiceList]);

  const getData = () => {
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
  };

  const pullToRefresh = () => {
    getData();
  };

  return (
    <Layout>
      <Header
        staticTitle={"invoice"}
        handleBack={() => props.navigation.goBack()}
      />
      <View style={[styles.container]}>
        <SectionList
          sections={refinedData}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={pullToRefresh}
          refreshing={invoiceState.loading}
          renderItem={(item) => <Item disable data={item} />}
          renderSectionHeader={({ section }) => (
            <SectionHeader data={section} />
          )}
          renderSectionFooter={({ section }) => (
            <SectionFooter data={section} />
          )}
          ListEmptyComponent={() =>
            !invoiceState.loading ? (
              <EmptyComponent text="هیج موردی یافت نشد!" />
            ) : null
          }
        />
      </View>
    </Layout>
  );
};

export default Invoice;
