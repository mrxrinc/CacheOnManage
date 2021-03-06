import React, { useState, useEffect } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { FormattedText } from "components/format-text";
import Header from "components/header";
import Layout from "components/layout";
import { colors } from "constants/index";
import style from "./style";
import Button from "components/button";
import Checkbox from "components/checkbox";
import Switch from "components/switch";
import { RootState } from "../../../../customType";
import { useSelector } from "react-redux";
import MaterialTextField from "components/materialTextfield";
import { addressInqury } from "utils/api";
import { debounce } from "utils";
import ActionModalBottom from "components/modal/actionModalBottom";
import ActionModalFullScreen from "components/modal/actionModalFullScreen";
import ChildrenPaymentLimits from "components/childrenPaymentLimits";
import { withTheme } from "themeCore/themeProvider";
import Policy from "./Policy";

type FormType = {
  nickname: string;
  enableCard: boolean;
  enableMobile: boolean;
};
type PaymentMethodType = {
  method: string;
  amount: string;
};

type CardType = {
  province?: string;
  city?: string;
  street?: string;
  buildingNo?: string;
  floor?: string;
  address?: string;
  postalCode?: string;
  phone?: string;
  avatar?: string;
  template?: string;
  vip?: string;
};

export const InquiryAddress = (props: any) => {
  const theme = props.theme.addChild;
  const token = useSelector<RootState, any>((state) => state.user.token);
  const [
    showInquiryAddressModal,
    setShowInquiryAddressModal,
  ] = useState<boolean>(false);
  const [showPolicyModal, setShowPolicyModal] = useState<boolean>(false);
  const [showMobileModal, setShowMobileModal] = useState<boolean>(false);
  const [error, setError] = useState<any>({ field: "", message: "" });
  const [postalCode, setPostalCode] = useState<string>("");
  const [address, setAddress] = useState<string | null>(null);
  const [card, setCard] = useState<CardType | null>(null);
  const [mobileNumber, setMobileNumber] = useState<string | null>(null);
  const [acceptPolicies, setAcceptPolicies] = useState<boolean>(false);
  const [readyToSubmit, setReadyToSubmit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<FormType>({
    nickname: "",
    enableCard: false,
    enableMobile: false,
  });
  const [paymentMethods, setPaymentMethods] = useState<
    Array<PaymentMethodType>
  >([]);
  const { params } = props.route;

  useEffect(() => {
    handleBeingReadyToSubmit();
  }, [form, acceptPolicies]);

  const handleBeingReadyToSubmit = () => {
    if (acceptPolicies) {
      setReadyToSubmit(true);
    } else {
      setReadyToSubmit(false);
    }
    return;
  };

  const _updateForm = (k: string, v: string | boolean) => {
    setForm({ ...form, [k]: v });
  };

  const handleAddressCheck = (value?: string) => {
    setLoading(true);
    clearError();
    if (!value) value = postalCode;
    addressInqury(token, value)
      .then((response: any) => {
        setAddress(response.data.address);
      })
      .catch((err: any) => {
        setAddress(null);
        setError({
          field: "postalCode",
          message: err.response.data.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const clearError = () => {
    setError({
      field: "",
      message: "",
    });
  };

  const handleNextPage = () => {
    props.navigation.push("username", {
      ...params,
      nickname: form.nickname,
      enableCard: form.enableCard,
      enableMobile: form.enableMobile,
      postalCode,
      address,
      paymentMethods,
      mobile: mobileNumber,
      card,
    });
  };

  const handleGetPaymentLimits = (data: PaymentMethodType[]) => {
    setPaymentMethods(data);
  };

  const handleGetCardData = (data: CardType) => {
    setCard(data);
  };

  return (
    <Layout>
      <>
        <Header
          staticTitle={"addChild"}
          handleBack={() => props.navigation.goBack()}
        />
        <View style={style.container}>
          <ScrollView>
            <View style={style.contentWrapper}>
              <FormattedText
                id="addChild.nickNameDescription"
                style={[style.title, { color: theme.subjectFont }]}
              />
              <MaterialTextField
                label="نام مستعار (اختیاری)"
                maxLength={30}
                onChange={clearError}
                onChangeText={(value: any) => _updateForm("nickname", value)}
                error={error.field === "nickname" ? error.message : null}
              />
            </View>

            <View
              style={[
                style.addressSection,
                { backgroundColor: theme.itemsBackground },
              ]}
            >
              <View
                style={[
                  style.haveCardWrapper,
                  { borderColor: theme.linearColor },
                ]}
              >
                <Checkbox
                  color={colors.buttonSubmitActive}
                  showActive={form.enableMobile}
                  onChange={(value: boolean) =>
                    _updateForm("enableMobile", value)
                  }
                />
                <FormattedText
                  id="addCild.mobilePaymentTitle"
                  style={[style.haveCardTitle, { color: theme.subjectFont }]}
                />
              </View>
              <FormattedText
                id="addCild.mobilePaymentDescription"
                style={[
                  style.haveCardDescription,
                  { color: theme.descriptionFont },
                ]}
              />
              <View
                style={{
                  height: 92,
                  justifyContent: "center",
                }}
              >
                <MaterialTextField
                  label="تلفن همراه"
                  disabled={!form.enableMobile}
                  keyboardType="phone-pad"
                  maxLength={11}
                  editable={form.enableMobile}
                  onChange={clearError}
                  onChangeText={(value: any) => setMobileNumber(value)}
                  error={error.field === "mobileNumber" ? error.message : null}
                />
              </View>

              <View style={style.editAddressButtonWrapper}>
                <Button
                  title="تعیین سقف پرداخت"
                  onPress={() => setShowMobileModal(true)}
                  color={theme.itemsButton}
                  disabled={!form.enableMobile}
                />
              </View>
            </View>

            <View style={style.verticalSpace} />

            <View
              style={[
                style.addressSection,
                { backgroundColor: theme.itemsBackground },
              ]}
            >
              <View
                style={[
                  style.haveCardWrapper,
                  { borderColor: theme.linearColor },
                ]}
              >
                <Checkbox
                  color={colors.buttonSubmitActive}
                  onChange={(value: boolean) => {
                    _updateForm("enableCard", value);
                  }}
                />
                <FormattedText
                  id="addCild.cardTitle"
                  style={[style.haveCardTitle, { color: theme.subjectFont }]}
                />
              </View>
              <FormattedText
                id="addCild.cardDescription"
                style={[
                  style.haveCardDescription,
                  { color: theme.descriptionFont },
                ]}
              />

              {address && (
                <FormattedText style={style.address} fontFamily="Regular-FaNum">
                  {address}
                </FormattedText>
              )}
              <View
                style={[
                  style.editAddressButtonWrapper,
                  { width: "100%", marginTop: 20 },
                ]}
              >
                <Button
                  title={`سفارش کارت ${
                    !!form?.nickname ? "برای " + form.nickname : ""
                  }`}
                  onPress={() => {
                    // setShowInquiryAddressModal(true);
                    props.navigation.navigate("defineCard", {
                      fromAddChild: handleGetCardData,
                    });
                  }}
                  color={theme.itemsButton}
                  disabled={!form.enableCard}
                />
              </View>
            </View>

            <View style={style.privacySwitchWrapper}>
              <Switch onChange={(value: boolean) => setAcceptPolicies(value)} />
              <FormattedText style={style.privacyText}>
                <FormattedText>پذیرش </FormattedText>
                <FormattedText
                  style={style.privacyModalButton}
                  onPress={() => setShowPolicyModal(true)}
                >
                  قوانین و مقررات
                </FormattedText>
              </FormattedText>
            </View>

            <View style={style.buttonWrapper}>
              <Button
                title="ساخت حساب کاربری فرزند"
                disabled={!readyToSubmit}
                onPress={handleNextPage}
                color={theme.mainButton}
              />
            </View>
          </ScrollView>
        </View>

        <ActionModalBottom
          showModal={showInquiryAddressModal}
          setShowModal={() => setShowInquiryAddressModal(false)}
          title="ویرایش آدرس ارسال کارت"
          onBackdropPress={() => setShowInquiryAddressModal(false)}
        >
          <View style={style.addressModalContent}>
            <View style={{ height: 50 }}>
              <FormattedText style={style.addressModalTitle}>
                لطفا کد پستی آدرسی که می‌خواهید کارت به آن ارسال شود را وارد
                نمائید.
              </FormattedText>
            </View>
            <MaterialTextField
              label="کد پستی"
              onChange={clearError}
              maxLength={10}
              editable={!loading}
              keyboardType="number-pad"
              onSubmitEditing={() => debounce(handleAddressCheck())}
              onChangeText={(value: string) => {
                setPostalCode(value);
                clearError();
                setAddress(null);
                if (value.length === 10) debounce(handleAddressCheck(value));
              }}
              error={error.field === "postalCode" ? error.message : null}
            />
            {address && !loading && (
              <>
                <View style={style.addressWrapper}>
                  <FormattedText id="address" />
                  <FormattedText style={{ lineHeight: 28 }}>
                    {address}
                  </FormattedText>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <Button
                    color={colors.buttonSubmitActive}
                    title="ثبت آدرس"
                    onPress={() => setShowInquiryAddressModal(false)}
                  />
                </View>
              </>
            )}
            {loading && (
              <View style={style.loadingWrapper}>
                <ActivityIndicator size="large" color={colors.gray500} />
              </View>
            )}
          </View>
        </ActionModalBottom>

        <ActionModalFullScreen
          showModal={showPolicyModal}
          setShowModal={() => setShowPolicyModal(false)}
          title="قوانین و مقررات"
        >
          <Policy />
        </ActionModalFullScreen>

        <ChildrenPaymentLimits
          showModal={showMobileModal}
          title="تعیین سقف پرداخت"
          setShowModal={(val: boolean) => setShowMobileModal(val)}
          handleGetPaymentLimits={handleGetPaymentLimits}
          childId={null}
        />
      </>
    </Layout>
  );
};

export default withTheme(InquiryAddress);
