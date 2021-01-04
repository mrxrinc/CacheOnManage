import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { WebView } from "react-native-webview";
import { FormattedText } from "components/format-text";
import Header from "components/header";
import Layout from "components/layout";
import { colors } from "constants/index";
import style from "./style";
import Button from "components/button";
import Checkbox from "components/checkbox";
import Switch from "components/switch";
import { RootState } from "../../../../customType";
import { useDispatch, useSelector } from "react-redux";
import MaterialTextField from "components/materialTextfield";
import { addressInqury } from "utils/api";
import { debounce } from "utils";
import ActionModalBottom from "components/modal/actionModalBottom";
import ActionModalFullScreen from "components/modal/actionModalFullScreen";
import ChildrenPaymentLimits from "components/childrenPaymentLimits";
import { POLICY_URL } from "constants/index";

type FormType = {
  nickname: string;
  enableAddress: boolean;
  enableMobile: boolean;
};
type PaymentMethodType = {
  method: string;
  amount: string;
};

export default (props: any) => {
  const token = useSelector<RootState, any>((state) => state.user.token);
  const [showInquiryAddressModal, setShowInquiryAddressModal] = useState<
    boolean
  >(false);
  const [showPolicyModal, setShowPolicyModal] = useState<boolean>(false);
  const [showMobileModal, setShowMobileModal] = useState<boolean>(false);
  const [error, setError] = useState<any>({ field: "", message: "" });
  const [postalCode, setPostalCode] = useState<string>("");
  const [address, setAddress] = useState<string | null>(null);
  const [mobileNumber, setMobileNumber] = useState<string | null>(null);
  const [acceptPolicies, setAcceptPolicies] = useState<boolean>(false);
  const [readyToSubmit, setReadyToSubmit] = useState<boolean>(false);
  const [form, setForm] = useState<FormType>({
    nickname: "",
    enableAddress: false,
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
    console.log("AddressCheck");
    clearError();
    if (!value) value = postalCode;
    addressInqury(token, value)
      .then((response: any) => {
        console.log(response.data);
        setAddress(response.data.address);
      })
      .catch((err: any) => {
        console.log("err", err.response.data);
        setAddress(null);
        setError({
          field: "postalCode",
          message: err.response.data.message,
        });
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
      enableAddress: form.enableAddress,
      enableMobile: form.enableMobile,
      postalCode,
      address,
      paymentMethods,
      mobile: mobileNumber,
    });
  };

  const handleGetPaymentLimits = (data: PaymentMethodType[]) => {
    setPaymentMethods(data);
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
              <FormattedText style={style.title}>
                در صورتی‌ که فرزند خود را به نام دیگری صدا می‌زنید، آن را وارد
                کنید.
              </FormattedText>
              <MaterialTextField
                label="نام مستعار (اختیاری)"
                onChange={clearError}
                onChangeText={(value: any) => _updateForm("nickname", value)}
                error={error.field === "nickname" ? error.message : null}
              />
            </View>

            <View style={style.addressSection}>
              <View style={style.haveCardWrapper}>
                <Checkbox
                  color={colors.buttonSubmitActive}
                  showActive={form.enableMobile}
                  onChange={(value: boolean) =>
                    _updateForm("enableMobile", value)
                  }
                />
                <FormattedText style={style.haveCardTitle}>
                  امکان پرداخت موبایلی برای فرزند
                </FormattedText>
              </View>
              <FormattedText style={style.haveCardDescription}>
                در صورت انتخاب این گزینه شما میتوانید خرید‌های موبایلی را برای
                فرزندتان فعال کنید و برای هریک از آنها سقف تعیین نمائید.
              </FormattedText>

              <MaterialTextField
                label="تلفن همراه"
                disabled={!form.enableMobile}
                keyboardType="phone-pad"
                onChange={clearError}
                onChangeText={(value: any) => setMobileNumber(value)}
                error={error.field === "mobileNumber" ? error.message : null}
              />

              <View style={style.editAddressButtonWrapper}>
                <Button
                  title="تعیین سقف پرداخت"
                  onPress={() => setShowMobileModal(true)}
                  color={colors.buttonOpenActive}
                  disabled={!form.enableMobile}
                />
              </View>
            </View>

            <View style={style.verticalSpace} />

            <View style={style.addressSection}>
              <View style={style.haveCardWrapper}>
                <Checkbox
                  color={colors.buttonSubmitActive}
                  onChange={(value: boolean) =>
                    _updateForm("enableAddress", value)
                  }
                />
                <FormattedText style={style.haveCardTitle}>
                  می‌خواهم فرزندم کارت بانکی‌ داشته باشد.
                </FormattedText>
              </View>
              <FormattedText style={style.haveCardDescription}>
                در صورت انتخاب این گزینه و تائید شما در مرحله بعد، کارت صادر شده
                به آدرس شما ارسال میگردد.
              </FormattedText>

              {address && (
                <FormattedText style={style.address} fontFamily="Regular-FaNum">
                  {address}
                </FormattedText>
              )}
              <View style={style.editAddressButtonWrapper}>
                <Button
                  title="ویرایش آدرس ارسال "
                  onPress={() => setShowInquiryAddressModal(true)}
                  color={colors.buttonOpenActive}
                  disabled={!form.enableAddress}
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
                  قوانین و مقررات{" "}
                </FormattedText>
              </FormattedText>
            </View>

            <View style={style.buttonWrapper}>
              <Button
                title="ساخت حساب کاربری فرزند"
                disabled={!readyToSubmit}
                onPress={handleNextPage}
                color={colors.buttonSubmitActive}
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
            <FormattedText style={style.addressModalTitle}>
              لطفا کد پستی آدرسی که می‌خواهید کارت به آن ارسال شود را وارد
              نمائید.
            </FormattedText>
            <MaterialTextField
              label="کد پستی"
              onChange={clearError}
              maxLength={10}
              keyboardType="number-pad"
              onSubmitEditing={() => debounce(handleAddressCheck())}
              onChangeText={(value: string) => {
                setPostalCode(value);
                console.log(value);
                setAddress(null);
                if (value.length === 10) debounce(handleAddressCheck(value));
              }}
              error={error.field === "postalCode" ? error.message : null}
            />
            {address && (
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
          </View>
        </ActionModalBottom>

        <ActionModalFullScreen
          showModal={showPolicyModal}
          setShowModal={() => setShowPolicyModal(false)}
          title="قوانین و مقررات"
        >
          <WebView originWhitelist={["*"]} source={{ uri: POLICY_URL }} />
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
