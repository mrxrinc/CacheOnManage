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
import ScrollableTabView from "components/scrollableTabView";
import { getChildsCardData, getTransactions } from "utils/api";
import { useSelector } from "react-redux";
import { RootState, RootStateType } from "../../../customType";
import OrderBabayCard from "./orderBabyCard";
import MainPage from "./mainPage";
import { colors } from "constants/index";

const { width } = Dimensions.get("window");

const Cards = (props: any) => {
  const [childInfo, setChildInfo] = useState<any>([]);
  const [transactions, setTransactions] = useState<any>([]);
  const token = useSelector<RootState, any>((state) => state.user.token);
  const [loading, setLoading] = React.useState(false);
  const callCardInfo = useSelector<RootStateType, any>(
    (State) => State.cards.callCardsInfo
  );
  const isChild = useSelector<RootState, any>((state) => state.user.ischild);
  const hasBackButton = props.route.params?.hasBackButton;

  const getCardsData = () => {
    setLoading(true);
    getChildsCardData(token)
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
    getCardsData();
  };
  useEffect(() => {
    getCardsData();
  }, [callCardInfo]);

  const changeTab = (data: any) => {
    getTransactionData(childInfo[data.i].childId);
  };

  const getTransactionData = (childId: any) => {
    const data = {
      childId: childId,
      currentWeek: true,
    };
    getTransactions(token, data)
      .then((result) => {
        setTransactions(result.data);
        // getTransactionData(result.data[0].childId);
      })
      .catch((error) => {
        throw error;
      });
  };

  const CardsPage = (item: any) => {
    return (
      <ScrollView
        contentContainerStyle={styles.cardsPageBox}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            height: "100%",
            width: "100%",
            marginTop: 15,
          }}
        >
          {item.data.status == "NONE" ||
          item.data.status == "FORCED_PIN_CHANGE" ||
          item.data.status == "ORDERED" ? (
            <OrderBabayCard cardsInfo={item.data} />
          ) : (
            <MainPage cardsInfo={item.data} data={transactions} />
          )}
        </View>
      </ScrollView>
    );
  };

  return (
    <Layout>
      <MainHeader title={"کارتها"} hasBack={hasBackButton} />
      <View style={styles.container}>
        {loading == false && childInfo != "" ? (
          <ScrollableTabView
            onChangeTab={changeTab.bind(this)}
            hasTabbar={isChild ? false : true}
            style={{ backgroundColor: "#f4f6fa" }}
          >
            {childInfo.map((data: any, i: any) => {
              return (
                <CardsPage
                  tabLabel={`${data.nickName}`}
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
export default Cards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  cardsPageBox: {
    width: width,
    alignItems: "center",
    backgroundColor: "transparent",
    height: "100%",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
