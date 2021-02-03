import Layout from "components/layout";
import Header from "components/header";
import React, { FC, useEffect, useState } from "react";
import { ActivityIndicator, SectionList } from "react-native";
import { getSpendParent } from "utils/api";
import { RootState } from "../../../customType";
import { useSelector } from "react-redux";
import moment from "moment-jalaali";
import styles from "./styles";
import { InvoiceData } from "constants/types";
import ScrollableTabView from "components/scrollableTabView";
import EmptyComponent from "components/emptyComponent";
import Item from "./item";
import SectionFooter from "./sectionFooter";
import SectionHeader from "./sectionHeader";

const SpendParent: FC = (props: any) => {
  const token = useSelector<RootState, any>((state) => state.user.token);
  const [refinedData, setRefinedData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [childs, setChilds] = useState<any>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await getSpendParent(token);
      clcData(data, 0);
    } catch (error) {
      setLoading(false);
    }
  };

  const clcData = (data: any, childId: number) => {
    const currentDate = moment();
    const filteredCurrentWeekData = data[
      childId
    ].results.filter((date: InvoiceData) =>
      moment(date.date).isSame(currentDate, "week")
    );
    const filteredOthersData = data[childId].results.filter(
      (date: InvoiceData) => !moment(date.date).isSame(currentDate, "week")
    );
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
    setChilds(data);
    setLoading(false);
  };

  const ChildPage = (item: any) => {
    const isEmpty = item.data.length === 0 ? true : false;
    return isEmpty ? (
      <EmptyComponent text="تراکنشی برای نمایش وجود ندارد!" />
    ) : (
      <SectionList
        stickySectionHeadersEnabled={false}
        sections={refinedData}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item data={item} />}
        renderSectionHeader={({ section }) => <SectionHeader data={section} />}
        renderSectionFooter={({ section }) => <SectionFooter data={section} />}
      />
    );
  };

  const changeTab = (data: any) => {
    clcData(childs, data.i);
  };

  return (
    <Layout>
      <Header
        staticTitle={"child_spending"}
        handleBack={() => props.navigation.goBack()}
      />
      {!loading ? (
        <ScrollableTabView
          onChangeTab={changeTab.bind(this)}
          style={styles.scrollTab}
          hasTabbar={childs.length > 0 ? true : false}
        >
          {childs.map((data: any, i: any) => {
            return (
              <ChildPage
                tabLabel={`${data.nickName}`}
                data={data.results}
                i={i}
                key={i}
              />
            );
          })}
        </ScrollableTabView>
      ) : (
        <ActivityIndicator style={styles.loading} size="large" />
      )}
    </Layout>
  );
};
export default SpendParent;
