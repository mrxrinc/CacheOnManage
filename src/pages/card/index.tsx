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
import { getChildsCardData } from "utils/api";
import { useSelector } from "react-redux";
import { RootState, RootStateType } from "../../../customType";
import OrderBabayCard from "./orderBabyCard";
import MainPage from "./mainPage";

const { width } = Dimensions.get("window");

const Cards = (props: any) => {
  const [childInfo, setChildInfo] = useState<any>([]);
  const token = useSelector<RootState, any>((state) => state.user.token);
  const callCardInfo = useSelector<RootStateType, any>(
    (State) => State.cards.callCardsInfo
  );
  const isChild = useSelector<RootState, any>((state) => state.user.ischild);
  const hasBackButton = props.route.params?.hasBackButton;
  console.log(props.route);

  const getCardsData = () => {
    console.log("getCardsData>> token", token);
    getChildsCardData(token)
      .then((response: any) => {
        console.log("getCardsData>> response", response);
        setChildInfo(response.data);
      })
      .catch(function (error) {
        throw error;
      });
  };

  useEffect(() => {
    getCardsData();
  }, [callCardInfo]);

  const CardsPage = (item: any) => {
    console.log("item.data.status>>", item.data.status);
    return (
      <ScrollView contentContainerStyle={styles.cardsPageBox}>
        <View
          style={{
            height:
              item.data.status == "NONE" ||
              item.data.status == "FORCED_PIN_CHANGE" ||
              item.data.status == "ORDERED"
                ? "90%"
                : "100%",
            width: "100%",
          }}
        >
          {item.data.status == "NONE" ||
          item.data.status == "FORCED_PIN_CHANGE" ||
          item.data.status == "ORDERED" ? (
            <OrderBabayCard cardsInfo={item.data} />
          ) : (
            <MainPage cardsInfo={item.data} />
          )}
        </View>
      </ScrollView>
    );
  };
  return (
    <Layout>
      <MainHeader title={"کارتها"} hasBack={hasBackButton} />
      <View style={styles.container}>
        {childInfo != "" ? (
          <ScrollableTabView
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
          <View style={{ marginTop: "10%" }}>
            <ActivityIndicator size="large" />
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
    backgroundColor: "#f4f6fa",
    height: "100%",
  },
});
