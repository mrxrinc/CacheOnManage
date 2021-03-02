import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import ActionModalFullScreen from "components/modal/actionModalFullScreen";
import { FormattedText } from "components/format-text";
import Button from "components/button";
import Input from "components/input";
import Checkbox from "components/checkbox";
import { RootState } from "../../../customType";
import { formatNumber } from "utils";
import styles from "./styles";
import { chargingPayments } from "utils/api";
import { withTheme } from "themeCore/themeProvider";

type PaymentMethodType = {
  method: string;
  amount: string;
};

const initialData = [
  { amount: " ", method: "qrPayment" },
  { amount: " ", method: "mobilePerPayment" },
  { amount: " ", method: "internetPackage" },
  { amount: " ", method: "mobileBill" },
];

const renderPaymentMethodItem = (
  title: string,
  description: string,
  amount: string,
  method: string,
  paymentMethods: any,
  setPaymentMethods: any,
  isChild: boolean,
  theme: any
) => {
  let itemData = {
    title,
    description,
    amount,
    method,
  };

  const activeMethod =
    paymentMethods.filter((n: any) => n.method === method).length > 0;
  let rowAmount = paymentMethods.filter((n: any) => n.method === method)[0];
  rowAmount = rowAmount ? rowAmount["amount"] : "";
  return (
    <View style={styles.itemsWrapper} key={itemData.title}>
      <View style={styles.item}>
        <View style={styles.itemTitleWrapper}>
          <Checkbox
            showActive={activeMethod}
            onChange={() => {
              if (activeMethod) {
                setPaymentMethods(
                  paymentMethods.filter((n: any) => n.method !== method)
                );
                itemData.amount = "";
              } else {
                setPaymentMethods([
                  ...paymentMethods,
                  {
                    amount: itemData.amount,
                    method: itemData.method,
                  },
                ]);
              }
            }}
            disabled={isChild ? true : false}
            color={theme.ButtonGreenColor}
          />
          <View>
            <FormattedText style={styles.itemTitle}>{title}</FormattedText>
            <FormattedText style={styles.itemDescription}>
              {description}
            </FormattedText>
          </View>
        </View>
        <View style={styles.itemInputWrapper}>
          <View>
            <Input
              boxMode
              maxLength={11}
              keyboardType="number-pad"
              customStyle={[styles.itemInput]}
              value={formatNumber(activeMethod ? rowAmount : "")}
              editable={isChild || !activeMethod ? false : true}
              onChangeText={(value: string) => {
                itemData = {
                  ...itemData,
                  amount: value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ""),
                };
                if (activeMethod) {
                  setPaymentMethods([
                    ...paymentMethods.filter(
                      (n: any) => n.method !== itemData.method
                    ),
                    {
                      amount: itemData.amount,
                      method: itemData.method,
                    },
                  ]);
                }
              }}
            />
          </View>
          <View>
            <FormattedText id={"home.rial"} style={styles.currencyUnit} />
          </View>
        </View>
      </View>
    </View>
  );
};

const ChildrenPaymentLimits = ({
  showModal,
  setShowModal,
  handleGetPaymentLimits,
  childId,
  data,
  theme,
}: any) => {
  const token = useSelector<RootState, any>((state) => state.user.token);
  const isChild = useSelector<RootState, any>((state) => state.user.ischild);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [activeMethod, setActiveMethod] = useState<boolean>(false);
  const [info, setInfo] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState<
    Array<PaymentMethodType>
  >(data ? data : []);

  const handleSubmit = () => {
    setLoading(true);
    setErrorMessage("");
    if (childId) {
      chargingPayments(token, childId, paymentMethods)
        .then(() => {
          setLoading(false);
          setShowModal(false);
        })
        .catch((err: any) => {
          setLoading(false);
          setErrorMessage(err.response.data.message);
          // console.warn("err", err.response.data.message);
        });
    } else {
      if (typeof handleGetPaymentLimits === "function") {
        handleGetPaymentLimits(paymentMethods);
        setLoading(false);
      }
      setShowModal(false);
    }
  };
  useEffect(() => {
    data != "" ? setInfo(data) : setInfo(initialData);
  }, []);
  return (
    <ActionModalFullScreen
      showModal={showModal}
      title="تعیین سقف پرداخت"
      setShowModal={(val: boolean) => {
        setShowModal(val);
        // if (!val) setPaymentMethods([]);
      }}
    >
      <ScrollView>
        <View style={styles.container}>
          {!isChild && (
            <FormattedText style={styles.title}>
              لطفا نوع پرداخت و سقف آن را مشخص نمائید.
            </FormattedText>
          )}

          {info.map((item: any) => (
            <View
              style={{
                borderWidth: 1,
                marginTop: 20,
                height: 60,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Checkbox
                    showActive={activeMethod}
                    onChange={() => {}}
                    disabled={isChild ? true : false}
                    color={theme.ButtonGreenColor}
                  />
                </View>
                <View>
                  <FormattedText>پرداخت قبض موبایل</FormattedText>
                  <FormattedText>سقف ماهیانه خرید شارژ سیم‌کارت</FormattedText>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View>
                  <Input
                    boxMode
                    maxLength={11}
                    keyboardType="number-pad"
                    customStyle={styles.itemInput}
                    value={formatNumber(item.amount ? item.amount : "")}
                    editable={isChild || !activeMethod ? false : true}
                    onChangeText={(value: string) => {}}
                  />
                </View>
              </View>
              <View>
                <FormattedText id={"home.rial"} style={styles.currencyUnit} />
              </View>
            </View>
          ))}
          <FormattedText style={styles.error}>{errorMessage}</FormattedText>
        </View>
      </ScrollView>
      {!isChild && (
        <View style={styles.buttonWrapper}>
          <Button
            title="ذخیره"
            onPress={handleSubmit}
            color={theme.ButtonGreenColor}
            disabled={false}
            loading={loading}
          />
        </View>
      )}
    </ActionModalFullScreen>
  );
};

export default withTheme(ChildrenPaymentLimits);
