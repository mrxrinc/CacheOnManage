import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import MainHeader from "components/mainHeader";
import Layout from "components/layout";
import cacheonthegoChart from "./cacheonthegoChart";
import ScrollableTabView from "components/scrollableTabView";
import { getChildInfo } from "utils/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../customType";
import Addcacheonthego from "./addcacheonthego";
import ChildTaskList from "./childTaskList";
import { useNavigation } from "@react-navigation/core";
import Button from "components/button";
import { withTheme } from "themeCore/themeProvider";
import messages from "utils/fa";
import Skeleton from "components/skeleton/earning";

const { width } = Dimensions.get("window");
const Earning = (props: any) => {
  const { theme } = props;
  const navigation = useNavigation();
  const [childInfo, setChildInfo] = useState<any>([]);
  const token = useSelector<RootState, any>((state) => state.user.token);
  const [loading, setLoading] = React.useState(false);
  const earningDataa = useSelector<RootState, any>(
    (state) => state.earning.earningData
  );
  const hasBackButton = props.route.params?.hasBackButton;
  const isChild = useSelector<RootState, any>((state) => state.user.ischild);

  const getChildData = () => {
    setLoading(true);
    getChildInfo(token)
      .then((response: any) => {
        setLoading(false);
        setChildInfo(response.data);
      })
      .catch(function (error) {
        setLoading(false);
        throw error;
      });
  };
  const onRefresh = () => {
    getChildData();
  };
  useEffect(() => {
    getChildData();
  }, [earningDataa]);

  const ChildPage = (item: any) => {
    return (
      <View>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
        >
          <cacheonthegoChart childInfo={item.data} />
          <Addcacheonthego childInfo={item.data} />
          <ChildTaskList childInfo={item.data} />
        </ScrollView>
        <Button
          color={theme.ButtonBlueColor}
          style={styles.buttonWrapper}
          title={messages["earning.button"]}
          onPress={() =>
            navigation.navigate("addNewTask", { ChildData: item.data })
          }
        />
      </View>
    );
  };
  return (
    <Layout>
      <MainHeader
        title={
          isChild ? messages["earning.child.title"] : messages["earning.title"]
        }
        hasBack={hasBackButton}
      />
      <View style={styles.container}>
        {loading == false && childInfo != "" ? (
          <ScrollableTabView style={styles.tabView} hasTabbar={!isChild}>
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
          <Skeleton />
        )}
      </View>
    </Layout>
  );
};
export default withTheme(Earning);

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
  buttonWrapper: {
    width: width * 0.89,
    height: 44,
    position: "absolute",
    alignSelf: "center",
    bottom: 30,
  },
  tabView: { backgroundColor: "#f4f6fa" },
  scrollView: {
    width: width,
    alignItems: "center",
    backgroundColor: "transparent",
    paddingBottom: 54,
  },
});
