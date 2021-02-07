import React, { useState } from "react";
import { View } from "react-native";
import { FormattedText } from "components/format-text";
import Header from "components/header";
import Layout from "components/layout";
import { colors } from "constants/index";
import styles from "./styles";
import Button from "components/button";
import Success from "components/icons/success.svg";
import Error from "components/icons/errorIcon.svg";
import AppIcon from "components/icons/appIcon.svg";
import { formatNumber } from "utils";
import { ScrollView } from "react-native-gesture-handler";

type Error = {
  errorText: string;
  isError: boolean;
};
export const TransactionResult = (props: any) => {
  const success = props.route.params?.success;
  const description = props.route.params?.description;
  const mobile = props.route.params?.mobile;
  const amount = props.route.params?.amount;
  const date = props.route.params?.date;
  const followupNumber = props.route.params?.followupNumber;

  const [error, setError] = useState<Error>({
    errorText: "عملیات پرداخت انجام نشده است",
    isError: !JSON.parse(success),
  });

  return (
    <Layout>
      <>
        <Header />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.cardWrapper}>
            {error.isError ? <Error /> : <Success />}
            <FormattedText
              fontFamily="Bold"
              style={[
                styles.title,
                {
                  color: error.isError ? colors.red : colors.title,
                },
              ]}
            >
              {error.isError ? error.errorText : description}
            </FormattedText>
            <View style={styles.modalResultRow}>
              <FormattedText style={styles.modalResultKeyText}>
                عملیات
              </FormattedText>
              <View style={styles.modalResultMiddleLine} />
              <View style={styles.modalResultValueTextWrapper}>
                <FormattedText style={styles.modalResultValueText}>
                  خرید بسته اینترنت
                </FormattedText>
              </View>
            </View>
            <View style={styles.modalResultRow}>
              <FormattedText style={styles.modalResultKeyText}>
                شماره همراه
              </FormattedText>
              <View style={styles.modalResultMiddleLine} />
              <View style={styles.modalResultValueTextWrapper}>
                <FormattedText
                  style={styles.modalResultValueText}
                  fontFamily="Regular-FaNum"
                >
                  {mobile}
                </FormattedText>
              </View>
            </View>
            <View style={styles.modalResultRow}>
              <FormattedText style={styles.modalResultKeyText}>
                مبلغ
              </FormattedText>
              <View style={styles.modalResultMiddleLine} />
              <View style={styles.modalResultValueTextWrapper}>
                <FormattedText
                  style={styles.modalResultValueText}
                  fontFamily="Regular-FaNum"
                >
                  {formatNumber(amount)} ريال
                </FormattedText>
              </View>
            </View>
            <View style={styles.modalResultRow}>
              <FormattedText style={styles.modalResultKeyText}>
                تاریخ و ساعت
              </FormattedText>
              <View style={styles.modalResultMiddleLine} />
              <View style={styles.modalResultValueTextWrapper}>
                <FormattedText
                  style={styles.modalResultValueText}
                  fontFamily="Regular-FaNum"
                >
                  {date}
                </FormattedText>
              </View>
            </View>
            {!!followupNumber && (
              <View style={styles.modalResultRow}>
                <FormattedText style={styles.modalResultKeyText}>
                  شماره پیگیری
                </FormattedText>
                <View style={styles.modalResultMiddleLine} />
                <View style={styles.modalResultValueTextWrapper}>
                  <FormattedText
                    style={styles.modalResultValueText}
                    fontFamily="Regular-FaNum"
                  >
                    {followupNumber ? followupNumber.substring(0, 25) : " -- "}
                  </FormattedText>
                </View>
              </View>
            )}
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
                  onPress={() =>
                    props.navigation.reset({
                      index: 0,
                      routes: [{ name: "entryType" }],
                    })
                  }
                />
              </View>
            </View>
            <View style={styles.appIconWrapper}>
              <AppIcon />
            </View>
          </View>
        </ScrollView>
      </>
    </Layout>
  );
};
