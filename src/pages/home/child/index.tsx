import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation, NavigationProp } from "@react-navigation/core";
import LinearGradient from "react-native-linear-gradient";
import { StackParamList } from "navigation/splash-stack-navigator";
import { FormattedText } from "components/format-text";
import { formatNumber } from "utils";
import MainHeader from "components/mainHeader/child";
import Header from "components/header";
import Layout from "components/layout";
import style from "./style";
import { colors } from "constants/index";
import { useDispatch, useSelector } from "react-redux";
import { getChildHomeData } from "utils/api";
import CashIcon from "components/icons/cash.svg";
import SavingIcon from "components/icons/saving.svg";
import ArrowIcon from "components/icons/arrow.svg";
import { RootState } from "../../../../customType";
import { getHomeData } from "redux/actions/Home";
import ChildrenPaymentLimits from "components/childrenPaymentLimits";

type Navigation = NavigationProp<StackParamList, "home">;

type ChildData = {
  id: number;
  name: string;
  avatar: string;
  weeklySpendingLimit: number;
  cardRemaining: number;
  savingRemaining: number;
  weeklyRemaining: number;
  weeklySpent: number;
  paymentMethods: {
    amount: string;
    method: string;
  }[];
  allowance: {
    days: number;
    amount: number;
  };
  activity: {
    remaining: number;
    amount: number;
  };
};

const isEmptyObject = (obj: any) => {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
};

export default ({ route }: any) => {
  const dispatch = useDispatch();
  const token = useSelector<RootState, any>((state) => state.user.token);
  const isChild = useSelector<any, any>((state) => state.user.ischild);
  let childId = route.params?.childId;
  const navigation = useNavigation<Navigation>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [childData, setChildData] = useState<ChildData | undefined>(undefined);
  const [showMobileModal, setShowMobileModal] = useState<boolean>(false);

  useEffect(() => {
    getChildData();
  }, []);

  const getChildData = async () => {
    try {
      setLoading(true);
      const resp = await getChildHomeData(token, childId);
      console.log("childHome>>", resp.data);
      setChildData(resp.data);
      setLoading(false);
      AsyncStorage.setItem("childPhone", resp.data.mobile ?? "");
      if (isChild) {
        dispatch(getHomeData(resp.data));
      }
      setRefreshing(false);
    } catch (err) {
      setLoading(false);
      console.warn("ERROR CHILD HOME: ", err);
    }
  };

  const pullToRefresh = () => {
    setRefreshing(true);
    getChildData();
  };
  return (
    <Layout>
      <>
        {!isChild ? (
          <Header
            dynamicTitle={childData?.name && `سلام ${childData?.name}!`}
            handleBack={() => navigation.goBack()}
          />
        ) : (
          <MainHeader name={childData?.name} />
        )}
        {!!childData && !loading && !isEmptyObject(childData) ? (
          <>
            <View style={style.container}>
              <ScrollView
                contentContainerStyle={style.content}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={pullToRefresh}
                  />
                }
              >
                <View style={style.remainingDaysWrapper}>
                  <FormattedText
                    style={style.remainingDays}
                    fontFamily="Regular-FaNum"
                  >
                    محدودیت خرج کردن شما در هفته{" "}
                    {formatNumber(childData.weeklySpendingLimit)} ریال می‌باشد.
                  </FormattedText>
                </View>

                <View style={style.contentBox}>
                  <View style={style.head}>
                    <Image
                      source={{
                        uri: `data:image/png;base64,${childData.avatar}`,
                      }}
                      style={style.avatar}
                    />
                  </View>
                  <View style={style.accountDetailSection}>
                    <TouchableOpacity
                      style={style.amountWrapper}
                      onPress={() => navigation.navigate("cards")}
                    >
                      <View style={style.amountRow}>
                        <CashIcon />
                        <View style={style.amountTextBox}>
                          <FormattedText
                            style={style.balances}
                            fontFamily="Regular-FaNum"
                          >
                            {formatNumber(childData.cardRemaining)}{" "}
                            <FormattedText
                              style={style.currency}
                              id={"home.rial"}
                            />
                          </FormattedText>
                          <FormattedText
                            style={style.amountTitle}
                            fontFamily="Regular-FaNum"
                          >
                            موجودی کارت
                          </FormattedText>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={style.amountWrapper}
                      onPress={() => navigation.navigate("saving")}
                    >
                      <View style={style.amountRow}>
                        <SavingIcon />
                        <View style={style.amountTextBox}>
                          <FormattedText
                            style={style.balances}
                            fontFamily="Regular-FaNum"
                          >
                            {formatNumber(childData.savingRemaining)}{" "}
                            <FormattedText
                              style={style.currency}
                              id={"home.rial"}
                            />
                          </FormattedText>
                          <FormattedText style={style.amountTitle}>
                            موجودی پس‌انداز
                          </FormattedText>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={style.sumCash}>
                    <FormattedText style={style.sumCashText}>
                      مجموع موجودی
                    </FormattedText>
                    <FormattedText
                      style={style.sumCashText}
                      fontFamily="Regular-FaNum"
                    >
                      {formatNumber(
                        childData.savingRemaining + childData.cardRemaining
                      )}{" "}
                      <FormattedText style={style.currency} id={"home.rial"} />
                    </FormattedText>
                  </View>

                  <View style={style.blueLine} />

                  <View style={style.chartSection}>
                    <FormattedText style={style.chartTitle}>
                      روند خرج هفتگی
                    </FormattedText>
                    <View style={style.chart}>
                      <LinearGradient
                        colors={[colors.gradientRight, colors.gradientLeft]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[
                          style.progress,
                          {
                            width: `${
                              (childData.weeklySpent /
                                childData.weeklySpendingLimit) *
                              100
                            }%`,
                          },
                        ]}
                      />
                    </View>
                  </View>

                  <View style={style.twinChildRow}>
                    <View>
                      <FormattedText style={style.twinChildTextKey}>
                        قابل دسترس در این هفته
                      </FormattedText>
                    </View>
                    <FormattedText
                      fontFamily="Regular-FaNum"
                      style={style.twinChildTextValue}
                    >
                      {formatNumber(childData.weeklyRemaining) || 0}{" "}
                      <FormattedText style={style.currency} id={"home.rial"} />
                    </FormattedText>
                  </View>

                  <View style={style.twinChildRow}>
                    <TouchableOpacity
                      style={style.twinLinkWrapper}
                      onPress={() =>
                        navigation.navigate("spent", { childId: childData.id })
                      }
                    >
                      <FormattedText style={style.twinChildTextKey}>
                        خرج شده در این هفته
                      </FormattedText>
                      <ArrowIcon
                        width={20}
                        height={20}
                        style={{ top: 2, color: colors.links }}
                      />
                    </TouchableOpacity>
                    <FormattedText
                      style={style.twinChildTextValue}
                      fontFamily="Regular-FaNum"
                    >
                      {formatNumber(childData.weeklySpent) || 0}{" "}
                      <FormattedText style={style.currency} id={"home.rial"} />
                    </FormattedText>
                  </View>
                </View>

                <TouchableOpacity
                  style={style.contentBox}
                  onPress={() =>
                    navigation.navigate("earning", { hasBackButton: true })
                  }
                >
                  <View style={style.twinChildRow}>
                    <View style={style.twinLinkWrapper}>
                      <FormattedText
                        style={style.twinChildTextKey}
                        fontFamily="Regular-FaNum"
                      >
                        {childData.allowance.days} روز تا پرداخت پول توجیبی
                      </FormattedText>
                      <ArrowIcon
                        width={20}
                        height={20}
                        style={{ top: 2, color: colors.links }}
                      />
                    </View>
                    <FormattedText
                      style={style.twinChildTextValue}
                      fontFamily="Regular-FaNum"
                    >
                      {formatNumber(childData.allowance.amount) || 0}{" "}
                      <FormattedText style={style.currency} id={"home.rial"} />
                    </FormattedText>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={style.contentBox}
                  onPress={() =>
                    navigation.navigate("earning", { hasBackButton: true })
                  }
                >
                  <View style={style.twinChildRow}>
                    <View style={style.twinLinkWrapper}>
                      <FormattedText
                        style={style.twinChildTextKey}
                        fontFamily="Regular-FaNum"
                      >
                        {childData.activity.remaining} فعالیت انجام نشده
                      </FormattedText>
                      <ArrowIcon
                        width={20}
                        height={20}
                        style={{ top: 2, color: colors.links }}
                      />
                    </View>
                    <FormattedText
                      style={style.twinChildTextValue}
                      fontFamily="Regular-FaNum"
                    >
                      {formatNumber(childData.activity.amount)}{" "}
                      <FormattedText style={style.currency} id={"home.rial"} />
                    </FormattedText>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={style.contentBox}
                  onPress={() => setShowMobileModal(true)}
                >
                  <View style={style.twinChildRow}>
                    <View style={style.twinLinkWrapper}>
                      <FormattedText
                        style={style.twinChildTextKey}
                        fontFamily="Regular-FaNum"
                      >
                        نمایش سقف خرید موبایلی
                      </FormattedText>
                      <ArrowIcon
                        width={20}
                        height={20}
                        style={{ top: 2, color: colors.links }}
                      />
                    </View>
                    <FormattedText
                      style={style.twinChildTextValue}
                      fontFamily="Regular-FaNum"
                    >
                      {formatNumber(childData.weeklySpendingLimit) || 0}{" "}
                      <FormattedText style={style.currency} id={"home.rial"} />
                    </FormattedText>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </View>

            <ChildrenPaymentLimits
              showModal={showMobileModal}
              title="تعیین سقف پرداخت"
              setShowModal={(val: boolean) => setShowMobileModal(val)}
              handleGetPaymentLimits={null}
              childId={null}
              data={childData.paymentMethods}
            />
          </>
        ) : loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator color={colors.gray600} size="large" />
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <FormattedText>دیتای این فرزند ناقص است!</FormattedText>
          </View>
        )}
      </>
    </Layout>
  );
};
