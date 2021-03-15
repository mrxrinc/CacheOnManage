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
import { useNavigation } from "@react-navigation/core";
import LinearGradient from "react-native-linear-gradient";
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
import { childPhoneNumber } from "store/QuickAccess/quickAccess.actions";
import { withTheme } from "themeCore/themeProvider";

type ChildData = {
  id: number;
  name: string;
  avatar: string;
  weeklySpendingLimit: number;
  cardRemaining: number;
  savingRemaining: number;
  weeklyRemaining: number;
  incomes: number;
  spending: number;
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

const ChildHome = ({ route, theme }: any) => {
  const dispatch = useDispatch();
  const token = useSelector<RootState, any>((state) => state.user.token);
  const isChild = useSelector<any, any>((state) => state.user.ischild);
  let childId = route.params?.childId;
  const navigation = useNavigation();
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
      setChildData(resp.data);
      setLoading(false);
      dispatch(childPhoneNumber(resp.data.mobile));
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

  const paymentLimitSum: () => string = () => {
    let total = 0;
    childData?.paymentMethods.map((item) => {
      total = total + parseInt(item.amount);
    });
    return `${total}`;
  };

  return (
    <Layout>
      <>
        {!isChild ? (
          <Header
            dynamicTitle={
              isChild
                ? childData?.name && `سلام ${childData?.name}!`
                : childData?.name
            }
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
                {/* <View style={style.remainingDaysWrapper} /> */}
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
                      onPress={() => navigation.navigate("cardTab")}
                    >
                      <View style={style.amountRow}>
                        <CashIcon />
                        <View style={style.amountTextBox}>
                          <FormattedText
                            style={style.balances}
                            fontFamily="Regular-FaNum"
                          >
                            {formatNumber(childData.cardRemaining)}
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
                      onPress={() => navigation.navigate("savingTab")}
                    >
                      <View style={style.amountRow}>
                        <SavingIcon />
                        <View style={style.amountTextBox}>
                          <FormattedText
                            style={style.balances}
                            fontFamily="Regular-FaNum"
                          >
                            {formatNumber(childData.savingRemaining) || 0}{" "}
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
                      ) || 0}{" "}
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
                        colors={[
                          theme.BlueGradient_Left,
                          theme.BlueGradient_Right,
                        ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[
                          style.progress,
                          {
                            width: `${
                              (childData.weeklySpent / childData.incomes) * 100
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
                      {formatNumber(childData.cardRemaining) || 0}{" "}
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
                    navigation.navigate("earningTab", { hasBackButton: true })
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
                    navigation.navigate("earningTab", { hasBackButton: true })
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
                      {formatNumber(childData.activity.amount) || 0}{" "}
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
                      {formatNumber(paymentLimitSum() || 0)}{" "}
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
          <View style={style.loading}>
            <ActivityIndicator color={colors.gray600} size="large" />
          </View>
        ) : (
          <View style={style.loading}>
            <FormattedText>دیتای این فرزند ناقص است!</FormattedText>
          </View>
        )}
      </>
    </Layout>
  );
};
export default withTheme(ChildHome);
