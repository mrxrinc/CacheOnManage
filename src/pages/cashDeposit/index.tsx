import React, { FC, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import Modal from "react-native-modal";
import { withTheme } from "themeCore/themeProvider";
import { FormattedText } from "components/format-text";
import Layout from "components/layout";
import Header from "components/header";
import Button from "components/button";
import Input from "components/input";
import MaterialInput from "components/materialTextfield";
import style from "./style";
import { colors, IOS } from "constants/index";
import CloseIcon from "components/icons/close.svg";
import TickIcon from "components/icons/coloredTick.svg";
import StopWatchIcon from "components/icons/stopwatch.svg";
import MoneyIcon from "components/icons/moneyColored.svg";
import Logo from "images/logoColored.png";

import { formatNumber, formatCardNumber, formatExpirationDate } from "utils";
import { topUp, harim } from "utils/api";
import { RootState } from "../../../customType";
import { useSelector } from "react-redux";

type CardNumberType = {
  value: string;
  skin: Array<string>;
};

const COUNTER = 120;
const FATHER_BLU_JR = "FATHER CASH JUNIOR";

const CashDeposit: FC = (props: any) => {
  const token = useSelector<RootState, any>((state) => state.user.token);
  const theme = props.theme;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isErrorMessage, setIsErrorMessage] = useState<boolean>(false);
  const [readyToSubmit, setReadyToSubmit] = useState<boolean>(false);
  const [cashDepositResponse, setCashDepositResponse] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<any>({
    sourcePan: "",
    amount: 0,
    cvv2: "",
    expirationDate: "",
    password: "",
    dynamicPassword: "",
  });

  useEffect(() => {
    setStatusMessage("");
    handleBeingReadyToSubmit();
  }, [form]);

  useEffect(() => {
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
      if (timeLeft < 3) {
        setStatusMessage("");
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleBeingReadyToSubmit = () => {
    if (
      form.sourcePan.length > 0 &&
      form.amount > 0 &&
      form.cvv2 > 0 &&
      form.expirationDate.length > 0 &&
      form.password.length > 0
    ) {
      setReadyToSubmit(true);
    } else {
      setReadyToSubmit(false);
    }
    return;
  };

  const _updateForm = (k: any, v: any) => {
    setForm({ ...form, [k]: v });
  };

  const handleTopUp = () => {
    setLoading(true);
    topUp(token, form)
      .then((response: any) => {
        setLoading(false);
        const data = [];
        let index = 0;
        for (let [key, value] of Object.entries(response.data)) {
          if (
            key !== "transactionTime" &&
            key !== "message" &&
            key !== "status"
          ) {
            data.push({
              id: index++,
              key,
              value:
                key === "transactionDate"
                  ? `${value}   ${response.data.transactionTime}`
                  : value !== ""
                  ? value
                  : 0,
              unit: key === "amount" ? true : false,
            });
          }
        }
        setCashDepositResponse({
          status: response.data.status,
          message: response.data.message,
          data,
        });
        setShowModal(true);
        setTimeLeft(0);
        setForm({
          ...form,
          cvv2: "",
          password: "",
        });
      })
      .catch((err: any) => {
        setLoading(false);
        setIsErrorMessage(true);
        setStatusMessage(err.response.data.message);
      });
  };

  const handleHarim = () => {
    if (form.sourcePan && form.amount && timeLeft === 0) {
      const { sourcePan, amount } = form;
      harim(token, sourcePan, amount)
        .then(() => {
          setIsErrorMessage(false);
          setStatusMessage("رمز پویا برای شما ارسال شد.");
          setTimeLeft(COUNTER);
        })
        .catch((err: any) => {
          setIsErrorMessage(true);
          setStatusMessage(err.response.data.message);
        });
    } else {
      setIsErrorMessage(true);
      setStatusMessage("شماره کارت و مبلغ را وارد کنید!");
    }
  };

  return (
    <Layout>
      <Header
        staticTitle={"cashDeposit"}
        handleBack={() => props.navigation.goBack()}
      />
      <KeyboardAvoidingView
        style={style.container}
        behavior={IOS ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={style.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={style.inputWrapper}>
            <MaterialInput
              label="مبلغ"
              tintColor={colors.title}
              hasUnit
              maxLength={13}
              keyboardType={"number-pad"}
              onChangeText={(value: string) =>
                _updateForm(
                  "amount",
                  value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, "")
                )
              }
              value={formatNumber(form.amount)}
              inputStyle={style.materialInput}
            />
          </View>
          <View style={style.inputWrapper}>
            <MaterialInput
              label="شماره کارت"
              tintColor={colors.title}
              maxLength={25}
              keyboardType={"number-pad"}
              onChangeText={(value: string) => {
                _updateForm("sourcePan", value.replace(/ - /g, ""));
              }}
              value={formatCardNumber(form.sourcePan)}
              inputStyle={style.materialInput}
            />
          </View>
          <View style={style.inputWrapper}>
            <View style={[style.halfWidth]}>
              <Input
                title={"cvv2"}
                customStyle={style.inputBox}
                inputCustomStyle={[
                  style.input,
                  {
                    fontFamily:
                      theme.key === FATHER_BLU_JR
                        ? "IRANYekanMobileFaNum"
                        : "IRANSansMobileFaNum",
                  },
                ]}
                maxLength={4}
                boxMode
                keyboardType={"number-pad"}
                onChangeText={(value: string) => _updateForm("cvv2", value)}
                value={form.cvv2}
              />
            </View>
            <View style={[style.halfWidth]}>
              <Input
                title={"expirationDate"}
                customStyle={style.inputBox}
                inputCustomStyle={[
                  style.input,
                  {
                    fontFamily:
                      theme.key === FATHER_BLU_JR
                        ? "IRANYekanMobileFaNum"
                        : "IRANSansMobileFaNum",
                  },
                ]}
                maxLength={5}
                boxMode
                keyboardType={"number-pad"}
                onChangeText={(value: string) => {
                  const date = value.split("/").join("");
                  if (date.length <= 4) _updateForm("expirationDate", date);
                }}
                value={formatExpirationDate(form.expirationDate)}
              />
            </View>
          </View>
          <View style={style.inputWrapper}>
            <View style={style.halfWidth}>
              <Input
                title={"secondPassword"}
                maxLength={12}
                customStyle={style.inputBox}
                inputCustomStyle={[
                  style.input,
                  {
                    fontFamily:
                      theme.key === FATHER_BLU_JR
                        ? "IRANYekanMobileFaNum"
                        : "IRANSansMobileFaNum",
                  },
                ]}
                boxMode
                secureTextEntry
                keyboardType={"number-pad"}
                onChangeText={(value: string) => _updateForm("password", value)}
                value={form.password}
              />
            </View>
            <View style={[style.halfWidth, style.getPassButtonWrapper]}>
              <TouchableOpacity
                style={[
                  style.getPassButton,
                  {
                    borderRadius: theme.buttonBorderRadius,
                    backgroundColor: theme.ButtonGreenColor,
                  },
                ]}
                onPress={handleHarim}
                disabled={timeLeft === 0 ? false : true}
              >
                {timeLeft === 0 ? (
                  <FormattedText style={style.getPassButtonTitle}>
                    دریافت رمز پویا
                  </FormattedText>
                ) : (
                  <View style={style.timerWrapper}>
                    <StopWatchIcon style={style.stopwatchStyle} />
                    <FormattedText
                      style={style.getPassButtonTitle}
                      fontFamily="Regular-FaNum"
                    >
                      {" "}
                      {("0" + Math.floor(timeLeft / 60)).slice(-2)}:
                      {("0" + (timeLeft % 60)).slice(-2)}
                    </FormattedText>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.messageWrapper}>
            <FormattedText
              style={{ color: isErrorMessage ? colors.red : colors.accent }}
            >
              {statusMessage}
            </FormattedText>
          </View>
        </ScrollView>

        <View style={style.submitButtonWrapper}>
          <Button
            title={"پرداخت"}
            style={style.submitButton}
            onPress={handleTopUp}
            color={theme.ButtonGreenColor}
            disabled={!readyToSubmit}
            loading={loading}
          />
        </View>

        <Modal
          useNativeDriver
          isVisible={showModal}
          onBackdropPress={() => setShowModal(false)}
          style={style.modal}
        >
          <View style={style.modalContainer}>
            <View style={style.modalSwipeHandle} />
            <View style={style.modalHead}>
              <View style={style.modalLogoWrapper}>
                <View style={style.modalLogo} />
              </View>
              <View style={style.modalTitleWrapper}>
                {cashDepositResponse?.status && (
                  <FormattedText
                    id={"transactionResid"}
                    style={style.modalTitle}
                  />
                )}
              </View>
              <TouchableOpacity
                style={style.modalCloseWrapper}
                onPress={() => setShowModal(false)}
              >
                <CloseIcon width={15} height={15} fill={colors.gray200} />
              </TouchableOpacity>
            </View>

            <View style={style.modalContent}>
              <View style={style.modalConfirmIconWrapper}>
                {cashDepositResponse?.status ? (
                  <TickIcon width={40} height={40} fill={colors.accent} />
                ) : (
                  <View style={style.modalErrorIconWrapper}>
                    <View style={style.errorCircle}>
                      <CloseIcon width={14} height={14} fill={colors.white} />
                    </View>
                  </View>
                )}
              </View>
              <FormattedText
                style={[
                  style.modalResultTitle,
                  {
                    color: cashDepositResponse?.status
                      ? colors.title
                      : colors.red,
                  },
                ]}
              >
                {cashDepositResponse && cashDepositResponse.message}
              </FormattedText>

              {cashDepositResponse &&
                cashDepositResponse.data.map((item: any) => {
                  if (item?.value)
                    return (
                      <View style={style.modalResultRow} key={item.id}>
                        <FormattedText
                          id={item.key}
                          style={style.modalResultKeyText}
                        />
                        <View style={style.modalResultMiddleLine} />
                        <View style={style.modalResultValueTextWrapper}>
                          <FormattedText
                            style={style.modalResultValueText}
                            fontFamily="Regular-FaNum"
                          >
                            {item.unit
                              ? formatNumber(item.value)
                              : item.key === "sourcePan"
                              ? formatCardNumber(item.value)
                              : item.value}
                          </FormattedText>
                          {item.unit && (
                            <FormattedText
                              id={"home.rial"}
                              style={style.modalResultValueUnit}
                            />
                          )}
                        </View>
                      </View>
                    );
                })}
            </View>
            <View style={style.modalFooter}>
              <Image source={Logo} style={style.logoStyle} />
              <MoneyIcon />
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default withTheme(CashDeposit);
