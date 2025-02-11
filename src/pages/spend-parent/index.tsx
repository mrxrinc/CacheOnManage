import Layout from "components/layout";
import Header from "components/header";
import React, { FC, useEffect, useState } from "react";
import { SectionList } from "react-native";
import { getSpendParent } from "utils/api";
import { RootState } from "../../../customType";
import { useSelector } from "react-redux";
import styles from "./styles";
import ScrollableTabView from "components/scrollableTabView";
import EmptyComponent from "components/emptyComponent";
import Item from "pages/transactions/item";
import SectionFooter from "./sectionFooter";
import SectionHeader from "./sectionHeader";
import Skeleton from "components/skeleton/cardsList";

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
    setRefinedData([
      {
        title: "هفته جاری",
        data: data[childId].currentWeek,
      },
      {
        title: "سایر تراکنش ها",
        data: data[childId].results,
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
        stickySectionHeadersEnabled
        sections={refinedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item) => <Item data={item} />}
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
        <Skeleton />
      )}
    </Layout>
  );
};
export default SpendParent;
