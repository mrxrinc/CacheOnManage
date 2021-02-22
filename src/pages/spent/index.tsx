import React, { FC, useState, useEffect } from "react";
import moment from "moment-jalaali";
import { getDebit } from "utils/api";
import { InvoiceData } from "constants/types";
import Layout from "components/layout";
import Header from "components/header";
import EmptyComponent from "components/emptyComponent";
import { View, SectionList } from "react-native";
import { RootState } from "../../../customType";
import { useSelector } from "react-redux";
import styles from "./styles";
import Item from "pages/transactions/item";
import SectionFooter from "pages/spend-parent/sectionFooter";
import SectionHeader from "pages/spend-parent/sectionHeader";

const Invoice: FC = (props: any) => {
  const childId = props.route.params?.childId;
  const [refinedData, setRefinedData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
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
    } catch (error) {
      setLoading(false);
      console.warn("ERROR ON GETTING CHILD SPENT DATA: ", error.response);
    }
  };

  const pullToRefresh = () => {
    getData();
  };

  return (
    <Layout>
      <Header
        staticTitle={"spent"}
        handleBack={() => props.navigation.goBack()}
      />
      <View style={[styles.container]}>
        <SectionList
          sections={refinedData}
          stickySectionHeadersEnabled
          keyExtractor={(item, index) => index.toString()}
          onRefresh={pullToRefresh}
          refreshing={loading}
          renderItem={(item) => <Item disable data={item} />}
          renderSectionHeader={({ section }) => (
            <SectionHeader data={section} />
          )}
          renderSectionFooter={({ section }) => (
            <SectionFooter data={section} />
          )}
          ListEmptyComponent={() =>
            !loading ? <EmptyComponent text="هیج موردی یافت نشد!" /> : null
          }
        />
      </View>
    </Layout>
  );
};

export default Invoice;
