import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { FormattedText } from "components/format-text";
import Header from "components/header";
import Layout from "components/layout";
import Rightel from "images/mobile-topup/oprators/rightel.svg";
import Irancell from "images/mobile-topup/oprators/irancell.svg";
import Hamrahaval from "images/mobile-topup/oprators/hamrahaval.svg";
import { useNavigation, NavigationProp } from "@react-navigation/core";
import { StackParamList } from "navigation/mobileTopUp-stack-navigator";
import { colors } from "constants/index";
import Button from "components/button";
import ActionModalCentered from "components/modal/actionModalCentered";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import Success from "components/icons/success.svg";
import Error from "components/icons/errorIcon.svg";
import AppIcon from "components/icons/appIcon.svg";
import { mobileTopUpPageName } from "store/MobileTopUp/mobileTopUp.actions";
import * as Keychain from "react-native-keychain";
import { mobileTopUpPayment, login } from "utils/api";
import { validateUserName } from "utils/validators";
import { RootStateType } from "../../../../../customType";
import { formatNumber } from "utils/index";
import { getLocalData } from "utils/localStorage";
import { numberToWords } from "utils/formaters/numberToWords";

interface IError {
  errorText: string;
  isError: boolean;
}

type Navigation = NavigationProp<StackParamList>;

const MobileTopUp = (props: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<Navigation>();
  const topUpAmount = props.route.params?.topUpAmount;
  const childPhoneNum = useSelector<RootStateType, any>(
    (state) => state.mobileTopUp.childPhone
  );
  const operatorName = useSelector<RootStateType, any>(
    (state) => state.mobileTopUp.operatorName
  );
  const [showInquiryResponseModal, setShowInquiryResponseModal] = useState<
    boolean
  >(false);
  const [topUpInfo, setTopUpInfo] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const [error, setError] = useState<IError>({
    errorText: "",
    isError: false,
  });
  const [
    biometricType,
    setBiometricType,
  ] = useState<Keychain.BIOMETRY_TYPE | null>(null);

  const isChild = useSelector<RootState, any>((state) => state.user.ischild);

  const handleTouch = async (username: string, password: string) => {
    setLoading(true);
    const data = {
      mobile: childPhoneNum,
      operator: operatorName,
      amount: topUpAmount,
    };
    if (validateUserName(username)) {
      login(username, password, isChild)
        .then((response: any) => {
          if (response.status == 200) {
            const token = response.data.access_token;
            console.log("topUp response is0:", token);
            if (biometricType) {
              (async () => {
                const checkWasAssigened = await getLocalData("biometrics");
                console.log({ checkWasAssigened });
                if (!checkWasAssigened) {
                  setShowBiometricModal(true);
                } else {
                  console.log("topUp response is1:");
                  mobileTopUpPayment(token, data)
                    .then((response: any) => {
                      console.log("topUp response is2:", response);
                    })
                    .catch((err) => {
                      console.log("topUp response is4:", err);
                    });
                }
              })();
            } else {
              mobileTopUpPayment(token, data)
                .then((response: any) => {
                  setLoading(false);
                  setTopUpInfo(response.data);
                  setShowInquiryResponseModal(true);
                })
                .catch((err) => {
                  console.log("topUp err is3:", err.response.data);
                  setLoading(false);
                  setError({
                    errorText: err.response.data.message,
                    isError: true,
                  });
                  setShowInquiryResponseModal(true);
                });
              // navigation.reset({ index: 0, routes: [{ name: "main" }] });
              // setUsername("");
              // setPassword("");
            }
          } else {
            setError({
              errorText: "نام کاربری یا کلمه عبور اشتباه است",
              isError: true,
            });
          }
        })
        .catch((err) => {
          console.warn("SIGNIN ERROR: ", err.response);
          setLoading(false);
          setError({ errorText: err.response.data.message, isError: true });
        });
    }
  };

  const handleBiometricsAction = async () => {
    try {
      // Retrieve the credentials
      const options = {
        service: "MoneyApp",
        accessControl: "BIOMETRY_ANY_OR_DEVICE_PASSCODE",
        authenticationPrompt: {
          title: "ورود با اثر انگشت",
          description: "لطفا انگشت خود را بر روی حسگر گوشی قرار دهید",
          cancel: "انصراف",
        },
      };
      const credentials = await Keychain.getGenericPassword(options);
      if (credentials) {
        console.log(
          "Credentials successfully loaded for user " +
            credentials.username +
            " " +
            credentials.password
        );
        setUsername(credentials.username);
        setPassword(credentials.password);
        handleTouch(credentials.username, credentials.password);
      } else {
        console.warn("No credentials stored");
        setError({
          errorText: "اثر انگشت شما ثبت نشده است",
          isError: true,
        });
      }
    } catch (error) {
      console.warn("Keychain couldn't be accessed!", error);
      setError({
        errorText: "شناسایی اثر انگشت با مشکل روبرو شد",
        isError: true,
      });
    }
  };

  const renderResult = () => {
    return (
      <>
        <View style={[styles.inquiryResultWrapper]}>
          {error.isError ? <Error /> : <Success />}
          <FormattedText
            style={{
              color: error.isError ? "#ff0000" : "#00015d",
              fontSize: 16,
            }}
          >
            خرید شارژ با موفقیت انجام شد.
          </FormattedText>
          <View style={styles.modalResultRow}>
            <FormattedText style={styles.modalResultKeyText}>
              عملیات
            </FormattedText>
            <View style={styles.modalResultMiddleLine} />
            <View style={styles.modalResultValueTextWrapper}>
              <FormattedText style={styles.modalResultValueText}>
                خرید شارژ موبایل
              </FormattedText>
            </View>
          </View>
          <View style={styles.modalResultRow}>
            <FormattedText style={styles.modalResultKeyText}>
              شماره همراه
            </FormattedText>
            <View style={styles.modalResultMiddleLine} />
            <View style={styles.modalResultValueTextWrapper}>
              <FormattedText style={styles.modalResultValueText}>
                {childPhoneNum}
              </FormattedText>
            </View>
          </View>
          <View style={styles.modalResultRow}>
            <FormattedText style={styles.modalResultKeyText}>
              مبلغ
            </FormattedText>
            <View style={styles.modalResultMiddleLine} />
            <View style={styles.modalResultValueTextWrapper}>
              <FormattedText style={styles.modalResultValueText}>
                {formatNumber(topUpAmount)}
              </FormattedText>
            </View>
          </View>
          <View style={styles.modalResultRow}>
            <FormattedText style={styles.modalResultKeyText}>
              تاریخ و ساعت
            </FormattedText>
            <View style={styles.modalResultMiddleLine} />
            <View style={styles.modalResultValueTextWrapper}>
              <FormattedText style={styles.modalResultValueText}>
                {topUpInfo.date}
              </FormattedText>
            </View>
          </View>
          <View style={styles.modalResultRow}>
            <FormattedText style={styles.modalResultKeyText}>
              شماره پیگیری
            </FormattedText>
            <View style={styles.modalResultMiddleLine} />
            <View style={styles.modalResultValueTextWrapper}>
              <FormattedText style={styles.modalResultValueText}>
                {topUpInfo.followupNumber}
              </FormattedText>
            </View>
          </View>
        </View>
        <View style={styles.inquiryModalButtonsWrapper}>
          <View
            style={{
              flex: 0.99,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              color={colors.buttonSubmitActive}
              title="بستن"
              onPress={() => setShowInquiryResponseModal(false)}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "3%",
          }}
        >
          <AppIcon />
        </View>
      </>
    );
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Header
          staticTitle="verifyMobileTopUpPayment"
          handleBack={() => navigation.goBack()}
        />
        <View style={[styles.pageContainer]}>
          <View>
            <FormattedText fontFamily="Bold" style={styles.blueText}>
              تائید پرداخت
            </FormattedText>
          </View>
          <View style={styles.mobileInfo}>
            <View>
              <FormattedText style={{ color: "#515c6f", fontSize: 14 }}>
                خرید شارژ موبایل
              </FormattedText>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FormattedText fontFamily="Regular-FaNum">
                {childPhoneNum}
              </FormattedText>
              {operatorName == "IRANCELL" ? (
                <Irancell width={32} height={32} style={{ marginLeft: "3%" }} />
              ) : operatorName == "MCI" ? (
                <Hamrahaval
                  width={32}
                  height={32}
                  style={{ marginLeft: "3%" }}
                />
              ) : (
                <Rightel width={32} height={32} style={{ marginLeft: "3%" }} />
              )}
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormattedText style={{ color: "#515c6f", fontSize: 16 }}>
              مبلغ بدون احتساب مالیات بر ارزش افزوده
            </FormattedText>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FormattedText fontFamily="Medium" style={styles.blueText}>
                {formatNumber(topUpAmount)}
              </FormattedText>
              <FormattedText
                fontFamily="Medium"
                style={[styles.blueText, { marginLeft: "2%" }]}
              >
                ریال
              </FormattedText>
            </View>
            <FormattedText fontFamily="Light" style={styles.blueText}>
              {numberToWords(topUpAmount.slice(0, -1))} تومان
            </FormattedText>
          </View>
          <View>
            <View style={styles.buttonBox}>
              <View style={styles.payment}>
                <Button
                  color={colors.buttonSubmitActive}
                  loading={loading}
                  title="پرداخت"
                  onPress={handleBiometricsAction}
                />
              </View>
              <View style={styles.edit}>
                <Button
                  color={colors.blue}
                  title="ویرایش"
                  onPress={() => {
                    dispatch(mobileTopUpPageName("MNP"));
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "mobileTopUp" }],
                    });
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <ActionModalCentered
          showModal={showInquiryResponseModal}
          setShowModal={() => setShowInquiryResponseModal(false)}
          onBackdropPress={() => setShowInquiryResponseModal(false)}
        >
          {renderResult()}
        </ActionModalCentered>
      </View>
    </Layout>
  );
};
export default MobileTopUp;
