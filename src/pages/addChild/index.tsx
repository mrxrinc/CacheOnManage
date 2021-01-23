import React, { FC, useState, useRef } from "react";
import { View, ScrollView, Keyboard } from "react-native";
import DatePicker from "components/datePicker";
import Modal from "react-native-modal";
import { FormattedText } from "components/format-text";
import Header from "components/header";
import Layout from "components/layout";
import { colors } from "constants/index";
import style from "./style";
import Button from "components/button";
import { RootState } from "../../../customType";
import { useSelector } from "react-redux";
import MaterialTextField from "components/materialTextfield";
import { validateNationalId } from "utils/validators";
import { postOfficeInqury } from "utils/api";
import ActionModalCentered from "components/modal/actionModalCentered";
import CloseIcon from "components/icons/close.svg";
import { withTheme } from "themeCore/themeProvider";

type FormType = {
  nationalId: string;
  birthday: string;
};

type InquiryType = {
  status: string | null;
  data: any;
};

const resultKeys: any = {
  birthday: "تاریخ تولد",
  fatherName: "نام پدر",
  firstname: "نام",
  lastname: "نام خانوادگی",
  nationalId: "کد ملی",
};

const AddChild: FC = (props: any) => {
  const token = useSelector<RootState, any>((state) => state.user.token);
  const noBackButton = props.route.params?.noBackButton;
  const [showDateModal, setShowDateModal] = useState<boolean>(false);
  const [showInquiryResponseModal, setShowInquiryResponseModal] = useState<
    boolean
  >(false);
  const [inquiry, setInquiry] = useState<InquiryType>({
    status: null,
    data: null,
  });
  const [birthday, setBirthday] = useState<any>("");
  const [error, setError] = useState<any>({ field: "", message: "" });
  const [loading, setLoading] = useState(false);
  const birthdayRef = useRef();
  const PersianDatePickerRef = useRef();

  const [form, setForm] = useState<FormType>({
    nationalId: "",
    birthday: "",
  });

  const _updateForm = (k: string, v: string) => {
    setForm({ ...form, [k]: v });
  };

  const onBirthdayConfirm = () => {
    setShowDateModal(false);
    // const formattedBirthday =
    //   birthday[2] + "/" + birthday[1] + "/" + birthday[0];
    // birthdayRef.current.blur();
    Keyboard.dismiss();
    // birthdayRef.current.setValue(birthday);
    _updateForm("birthday", birthday);
  };

  const handleInqury = () => {
    setLoading(true);
    clearError();
    clearInquiry();
    if (!validateNationalId(form.nationalId)) {
      setLoading(false);
      setError({
        field: "nationalId",
        message: "کد ملی‌ وارد شده معتبر نمیباشد.",
      });
      return;
    }

    const { nationalId, birthday } = form;
    setShowInquiryResponseModal(true);
    postOfficeInqury(token, nationalId, birthday)
      .then((response: any) => {
        setLoading(false);
        setInquiry({
          status: "success",
          data: {
            ...response.data,
            birthday: response.data.birthday.replace(/-/g, "/"),
          },
        });
      })
      .catch((err: any) => {
        setLoading(false);
        setInquiry({
          status: "fail",
          data: err.response.data,
        });
      });
  };

  const clearError = () => {
    setError({
      field: "",
      message: "",
    });
  };

  const clearInquiry = () => {
    setInquiry({
      status: null,
      data: null,
    });
  };

  const handleNextPage = () => {
    setShowInquiryResponseModal(false);
    const data = { ...inquiry.data };
    props.navigation.push("inquiryAddress", data);
  };

  const renderResult = () => {
    if (inquiry.status === "fail") {
      return (
        <View style={style.inquiryModalContentWrapper}>
          <View style={style.modalErrorIconWrapper}>
            <View style={style.errorCircle}>
              <CloseIcon width={14} height={14} fill={colors.white} />
            </View>
          </View>
          <FormattedText style={style.inquiryErrorTitle}>
            {inquiry.data.message}
          </FormattedText>
        </View>
      );
    } else if (inquiry.status === "success") {
      const result = [];
      for (const [key, value] of Object.entries(inquiry.data)) {
        result.push({ key, value });
      }
      return (
        <>
          <View style={style.inquiryResultWrapper}>
            {result.map((item: any) => (
              <View style={style.modalResultRow} key={item.key}>
                <FormattedText style={style.modalResultKeyText}>
                  {resultKeys[item.key]}
                </FormattedText>
                <View style={style.modalResultMiddleLine} />
                <View style={style.modalResultValueTextWrapper}>
                  <FormattedText
                    style={style.modalResultValueText}
                    fontFamily="Regular-FaNum"
                  >
                    {item.value}
                  </FormattedText>
                </View>
              </View>
            ))}
          </View>
          <View style={style.inquiryModalButtonsWrapper}>
            <View style={{ flex: 0.58 }}>
              <Button
                color={colors.buttonSubmitActive}
                title="تائید و ادامه"
                onPress={handleNextPage}
              />
            </View>
            <View style={{ flex: 0.38 }}>
              <Button
                color={colors.links}
                title="انصراف"
                outline
                onPress={() => setShowInquiryResponseModal(false)}
              />
            </View>
          </View>
        </>
      );
    }
  };

  return (
    <Layout>
      <Header
        staticTitle={"addChild"}
        handleBack={!noBackButton ? () => props.navigation.goBack() : null}
      />
      <ScrollView contentContainerStyle={[style.content]}>
        <FormattedText
          id="addChild.firstInput"
          style={[style.title, { color: props.theme.addChild.descriptionFont }]}
        />
        <MaterialTextField
          label="کد ملی"
          keyboardType="number-pad"
          maxLength={10}
          onChange={clearError}
          onChangeText={(value: any) => _updateForm("nationalId", value)}
          error={error.field === "nationalId" ? error.message : null}
        />
        <MaterialTextField
          label="تاریخ تولد"
          showSoftInputOnFocus={false}
          onFocus={() => {
            setShowDateModal(true);
          }}
          icon="arrow"
          ref={birthdayRef}
        />
        <Button
          title="استعلام"
          onPress={handleInqury}
          color={colors.buttonSubmitActive}
          style={style.button}
          loading={loading}
        />
      </ScrollView>

      <Modal
        isVisible={showDateModal}
        onBackdropPress={() => setShowDateModal(false)}
        style={style.modal}
      >
        <View style={style.modalContainer}>
          <View style={style.modalSwipeHandle} />
          <FormattedText id="addCild.ageWarning" style={style.ageWarning} />
          <DatePicker birthDate={(value: any) => setBirthday(value)} />
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <Button
              title="انتخاب"
              onPress={onBirthdayConfirm}
              color={colors.links}
            />
          </View>
        </View>
      </Modal>

      <ActionModalCentered
        showModal={showInquiryResponseModal}
        setShowModal={() => setShowInquiryResponseModal(false)}
        title="نتیجه استعلام"
        onBackdropPress={() => setShowInquiryResponseModal(false)}
      >
        {inquiry.status && renderResult()}
      </ActionModalCentered>
    </Layout>
  );
};

export default withTheme(AddChild);
