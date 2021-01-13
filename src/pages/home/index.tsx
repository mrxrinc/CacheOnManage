import React, { FC, useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import Button from "components/button";
import { StackParamList } from "navigation/splash-stack-navigator";
import { FormattedText } from "components/format-text";
import MainHeader from "components/mainHeader";
import BalanceCard from "./components/balanceCard";
import Layout from "components/layout";
import { colors } from "constants/index";
import { BalanceCardType, HomeHeaderType } from "constants/types";
import { getHomePageData } from "utils/api";
import { getHomeData } from "redux/actions/Home";
import { RootState } from "../../../customType";
import style from "./style";
import { withTheme } from "themeCore/themeProvider";

type Navigation = NavigationProp<StackParamList, "home">;

type Cards = {
  cards: Array<BalanceCardType>;
  firstPayment: number;
};

const Home: FC = ({ theme }: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<Navigation>();
  const isChild = useSelector<any, any>((state) => state.user.ischild);
  const token = useSelector<RootState, any>((state) => state.user.token);
  const [cards, setCards] = useState<Cards>({ cards: [], firstPayment: 0 });
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [header, setHeader] = useState<HomeHeaderType>({
    id: 1,
    nickname: "",
    balance: "0",
    avatar: "",
    title: "",
    theme: {},
  });
  useEffect(() => {
    if (isChild) {
      navigation.reset({ index: 0, routes: [{ name: "childHome" }] });
    } else {
      getData();
    }
  }, []);

  const getData = async () => {
    try {
      const { cards, header } = await getHomePageData(token);
      dispatch(getHomeData(header));
      setCards(cards);
      setHeader(header);
      setRefreshing(false);
      if (cards.cards.length === 0) {
        navigation.navigate("addChild", { noBackButton: true });
      }
    } catch (error) {
      console.warn(error.response);
    }
  };

  const goToChildDetail = (childId: number) => {
    navigation.navigate("childHome", {
      childId,
    });
  };

  const pullToRefresh = () => {
    setRefreshing(true);
    getData();
  };

  const renderButtons = () => (
    <View>
      {!!cards.firstPayment && (
        <View style={style.remainingDaysWrapper}>
          <FormattedText
            style={[style.remainingDays]}
            fontFamily="Regular-FaNum"
          >
            {cards.firstPayment} روز تا پرداخت بعدی
          </FormattedText>
        </View>
      )}
      <View style={[style.buttonsWrapper]}>
        <Button
          style={{
            width: "47%",
            height: 44,
            elevation: 5,
            backgroundColor: theme.home.bgColorButton,
          }}
          titleStyle={{ color: colors.white }}
          onPress={() => navigation.navigate("transferMoney")}
          title="انتقال وجه"
        />
        <Button
          style={{
            width: "47%",
            height: 44,
            elevation: 5,
            backgroundColor: theme.home.bgColorButton,
          }}
          titleStyle={{ color: colors.white }}
          onPress={() => navigation.navigate("cashDeposit")}
          title="افزایش حساب"
        />
      </View>
    </View>
  );

  return (
    <Layout>
      <View style={[style.container]}>
        <MainHeader homePage {...header} />
        <View style={[style.content]}>
          <FlatList
            data={cards.cards}
            renderItem={({ item }) => (
              <BalanceCard onPress={() => goToChildDetail(item.id)} {...item} />
            )}
            onRefresh={pullToRefresh}
            refreshing={refreshing}
            keyExtractor={(item) => `${item.nickname}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={style.list}
            ListHeaderComponent={renderButtons}
            ListFooterComponent={<View style={style.listFooter} />}
          />
        </View>
      </View>
    </Layout>
  );
};

export default withTheme(Home);
