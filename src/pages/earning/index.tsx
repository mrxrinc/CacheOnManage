import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import MainHeader from "components/mainHeader";
import Layout from "components/layout";
import AllowanceChart from "./allowanceChart";
import ScrollableTabView from "components/scrollableTabView";
import { getChildInfo } from "utils/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../customType";
import AddAllowance from "./addAllowance";
import ChildTaskList from "./childTaskList";
import { colors } from "constants/index";

const { width } = Dimensions.get("window");

const Earning = (props: any) => {
  const [childInfo, setChildInfo] = useState<any>([]);
  const token = useSelector<RootState, any>((state) => state.user.token);
  const [refreshing, setRefreshing] = React.useState(false);
  const earningDataa = useSelector<RootState, any>(
    (state) => state.earning.earningData
  );
  const hasBackButton = props.route.params?.hasBackButton;
  const isChild = useSelector<RootState, any>((state) => state.user.ischild);

  const getChildData = () => {
    getChildInfo(token)
      .then((response: any) => {
        setRefreshing(false);
        setChildInfo(response.data);
      })
      .catch(function (error) {
        setRefreshing(false);
        throw error;
      });
  };
  const onRefresh = () => {
    setRefreshing(true);
    getChildData();
  };
  useEffect(() => {
    getChildData();
  }, [earningDataa]);

  const ChildPage = (item: any) => {
    return (
      <ScrollView
        contentContainerStyle={{
          width: width,
          alignItems: "center",
          backgroundColor: "#f4f6fa",
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <AllowanceChart childInfo={item.data} />
        <View
          style={{
            width: width,
            marginTop: 10,
          }}
        >
          <AddAllowance childInfo={item.data} />
        </View>

        <ChildTaskList childInfo={item.data} />
      </ScrollView>
    );
  };
  return (
    <Layout>
      <MainHeader title={"درآمد فرزندان"} hasBack={hasBackButton} />
      <View style={styles.container}>
        {childInfo != "" ? (
          <ScrollableTabView
            style={{ backgroundColor: "#f4f6fa" }}
            hasTabbar={!isChild}
          >
            {childInfo.map((data: any, i: any) => {
              return (
                <ChildPage
                  tabLabel={`${data.nickname}`}
                  data={data}
                  i={i}
                  key={i}
                />
              );
            })}
          </ScrollableTabView>
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator color={colors.gray600} size="large" />
          </View>
        )}
      </View>
    </Layout>
  );
};
export default Earning;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
