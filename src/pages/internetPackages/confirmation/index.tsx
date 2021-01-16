import React, { FC, useState } from "react";
import { View, ScrollView } from "react-native";
import { FormattedText } from "components/format-text";
import Header from "components/header";
import Layout from "components/layout";
import { colors } from "constants/index";
import styles from "./styles";
import Button from "components/button";
import { internetPackagesPayment } from "utils/api";
import { formatNumber } from "utils";
import Irancell from "images/carriers/irancell.svg";
import Mci from "images/carriers/mci.svg";
import Rightel from "images/carriers/rightel.svg";
import UnequalTwinButtons from "components/unequalTwinButtons";
import SigninModal from "components/signinModal";
import ActionModal from "components/modal/actionModalCentered";
import { numberToWords } from "utils/formaters/numberToWords";

type carrier = "MCI" | "IRANCELL" | "RIGHTEL";
const carrierName: carrier[] = ["MCI", "IRANCELL", "RIGHTEL"];

export const Confirmation: FC = (props: any) => {
  const mobileNumber = props.route.params?.mobileNumber;
  const operator = props.route.params?.operator;
  const planId = props.route.params?.planId;
  const chosenPackage = props.route.params?.chosenPackage;
  const [showSigninModal, setShowSigninModal] = useState<boolean>(false);
  const [notEnoughMoneyModal, setNotEnoughMoneyModal] = useState<boolean>(
    false
  );
  const [limitedQuotaModal, setLimitedQuotaModal] = useState<boolean>(false);
  const [totalLimit, setTotalLimit] = useState<string>("");
  const [spent, setSpent] = useState<string>("");

  const handleOperatorIcon = (carrier: carrier) => {
    switch (carrier) {
      case "MCI":
        return <Mci width={32} height={32} />;
      case "IRANCELL":
        return <Irancell width={32} height={32} />;
      case "RIGHTEL":
        return <Rightel width={32} height={32} />;
      default:
        return null;
    }
  };

  const handlePayment = (token: string) => {
    setShowSigninModal(false);
    internetPackagesPayment(token, {
      token,
      mobileNumber,
      operator,
      mobile: mobileNumber,
      planId,
      packageId: chosenPackage.packageId,
      title: chosenPackage.title,
      amount: parseInt(chosenPackage.tax),
    })
      .then((response: any) => {
        const data = response.data;
        props.navigation.navigate("transactionResult", {
          success: data.success,
          description: data.description,
          mobile: data.mobile,
          amount: data.amount,
          date: data.date,
          followupNumber: data.followupNumber,
        });
      })
      .catch((err: any) => {
        console.warn("ERROR: ", err.response);
        const { status, data } = err.response;
        const code = data?.code;
        if (status === 400 && code === "99104") {
          props.navigation.navigate("transactionResult", {
            success: false,
            description: data.message,
            mobile: data.details.mobile,
            amount: data.details.amount,
            date: data.details.date,
            followupNumber: data.details.followupNumber,
          });
        } else if (status === 403) {
          if (code === "99102") {
            setSpent(data.details.spent);
            setTotalLimit(data.details.totalLimit);
            setLimitedQuotaModal(true);
          } else if (code === "99103") {
            setNotEnoughMoneyModal(true);
          }
        }
      });
  };

  return (
    <Layout>
      <>
        <Header
          staticTitle={"confirmPayment"}
          handleBack={() => props.navigation.goBack()}
        />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.contentBox}>
            <FormattedText style={styles.title} id="confirmPayment" />
            <View style={styles.phoneNumberWrapper}>
              <FormattedText id="otp.mobileNumber" style={styles.phoneNumber} />
              <View style={styles.mobileAndLogo}>
                <FormattedText
                  style={styles.phoneNumberBesideLogo}
                  fontFamily="Regular-FaNum"
                >
                  {mobileNumber}
                </FormattedText>
                <View style={styles.currentOperatorLogo}>
                  {handleOperatorIcon(operator)}
                </View>
              </View>
            </View>
            {chosenPackage && (
              <>
                <FormattedText style={styles.title} fontFamily="Regular-FaNum">
                  {chosenPackage.title}
                </FormattedText>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FormattedText style={styles.amountWithTaxTitle}>
                    مبلغ با احتساب مالیات بر ارزش افزوده
                  </FormattedText>
                  <FormattedText fontFamily="Medium" style={styles.amount}>
                    {formatNumber(`${Number(chosenPackage.tax)}`)} ریال
                  </FormattedText>
                  <FormattedText
                    fontFamily="Light"
                    style={[styles.amount, { paddingHorizontal: 20 }]}
                  >
                    {/* {chosenPackage.amountLetteral} */}
                    {numberToWords(Number(chosenPackage.tax))} ریال
                  </FormattedText>
                </View>
              </>
            )}
            <UnequalTwinButtons
              mainText="پرداخت"
              mainColor={colors.buttonSubmitActive}
              mainOnPress={() => setShowSigninModal(true)}
              secondaryText="تغییر بسته"
              secondaryColor={colors.buttonOpenActive}
              secondaryOnPress={() => props.navigation.goBack()}
              style={styles.buttonsWrapper}
            />
          </View>
        </ScrollView>

        <SigninModal
          showModal={showSigninModal}
          setShowModal={setShowSigninModal}
          handleSignIn={handlePayment}
        />

        <ActionModal
          title="خرید بسته اینترنت"
          showModal={notEnoughMoneyModal}
          setShowModal={setNotEnoughMoneyModal}
        >
          <View style={styles.modalTextWrapper}>
            <FormattedText style={styles.modalText}>
              موجودی شما جهت انجام این عملیات کافی‌ نمیباشد.
            </FormattedText>
          </View>
          <Button
            title="انصراف"
            color={colors.buttonOpenActive}
            outline
            onPress={() => setNotEnoughMoneyModal(false)}
            style={styles.modalButton}
          />
        </ActionModal>

        <ActionModal
          title="خرید بسته اینترنت"
          showModal={limitedQuotaModal}
          setShowModal={setLimitedQuotaModal}
        >
          <View style={styles.modalTextWrapper}>
            <FormattedText style={styles.modalText} fontFamily="Regular-FaNum">
              شما
              {` ${formatNumber(spent)} `}
              ریال از
              {` ${formatNumber(totalLimit)} `}
              ریال محدودیت خرید بسته اینترنت خود استفاده کرده اید. مبلغ انتخاب
              شده از مقدار سقف خرید شما بیشتر می‌باشد.
            </FormattedText>
          </View>
          <UnequalTwinButtons
            mainText="تغییر بسته"
            mainColor={colors.buttonOpenActive}
            mainOnPress={() => props.navigation.goBack()}
            secondaryText="انصراف"
            secondaryColor={colors.buttonOpenActive}
            secondaryOnPress={() => setLimitedQuotaModal(false)}
            style={styles.modalButtonsWrapper}
          />
        </ActionModal>
      </>
    </Layout>
  );
};
