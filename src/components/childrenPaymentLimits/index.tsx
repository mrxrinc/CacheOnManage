import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import ActionModalFullScreen from "components/modal/actionModalFullScreen";
import { FormattedText } from "components/format-text";
import { colors } from "constants/index";
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
  {
    title: "پرداخت قبض موبایل",
    description: "سقف ماهیانه پرداخت قبض موبایل",
    amount: "",
    method: "mobileBill",
  },
  {
    title: "خرید بسته اینترنتی",
    description: "سقف ماهیانه خرید بسته اینترنت",
    amount: "",
    method: "internetPackage",
  },
  {
    title: "خرید شارژ سیم کارت",
    description: "سقف ماهیانه خرید شارژ سیم‌کارت",
    amount: "",
    method: "mobilePerPayment",
  },
  {
    title: "پرداخت با QR",
    description: "سقف ماهیانه پرداخت با QR",
    amount: "",
    method: "qrPayment",
  },
];

const renderPaymentMethodItem = (
  title: string,
  description: string,
  amount: string,
  method: string,
  paymentMethods: any,
  setPaymentMethods: any,
  isChild: boolean,
  theme: any,
  setDefualtAmount: any,
  defaultAmount: string
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
                setDefualtAmount("10000000");

                setPaymentMethods([
                  ...paymentMethods,
                  {
                    amount: itemData.amount || 10000000,
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
              value={formatNumber(
                activeMethod ? rowAmount || defaultAmount : ""
              )}
              editable={isChild || !activeMethod ? false : true}
              onChangeText={(value: string) => {
                setDefualtAmount("");
                rowAmount = "";
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
  const [defaultAmount, setDefualtAmount] = useState("10000000");
  const [clean, setClean] = useState<any>(null);
  const [paymentMethods, setPaymentMethods] = useState<
    Array<PaymentMethodType>
  >([]);

  const handleSubmit = () => {
    setLoading(true);
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
      }
      setShowModal(false);
    }
  };
  useEffect(() => {
    setPaymentMethods(data ? data : []);
  }, [clean]);
  return (
    <ActionModalFullScreen
      showModal={showModal}
      title="تعیین سقف پرداخت"
      setShowModal={(val: boolean) => {
        setShowModal(val);
        setDefualtAmount("");
        if (!val) setClean(Math.random());
      }}
    >
      <ScrollView>
        <View style={styles.container}>
          {!isChild && (
            <FormattedText style={styles.title}>
              لطفا نوع پرداخت و سقف آن را مشخص نمائید.
            </FormattedText>
          )}

          {initialData.map((item: any) =>
            renderPaymentMethodItem(
              item.title,
              item.description,
              item.amount,
              item.method,
              paymentMethods,
              setPaymentMethods,
              isChild,
              theme,
              setDefualtAmount,
              defaultAmount
            )
          )}
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
