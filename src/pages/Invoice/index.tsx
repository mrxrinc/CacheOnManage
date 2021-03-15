import React, { FC, useState, useEffect } from "react";
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
import Skeleton from "components/skeleton/cardsList";

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
    const { currentWeek, others }: any = invoiceState.invoiceList;
    if (currentWeek && others) {
      setRefinedData([
        {
          title: "هفته جاری",
          data: currentWeek,
        },
        {
          title: "سایر تراکنش ها",
          data: others,
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
      {invoiceState?.loading ? (
        <Skeleton />
      ) : (
        <View style={[styles.container]}>
          <SectionList
            stickySectionHeadersEnabled
            sections={refinedData}
            keyExtractor={(item, index) => index.toString()}
            onRefresh={pullToRefresh}
            refreshing={invoiceState.loading}
            renderItem={(item) => <Item data={item} />}
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
      )}
    </Layout>
  );
};

export default Invoice;
