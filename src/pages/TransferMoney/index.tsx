import React, { FC, useState, useEffect } from "react";
// Constants
import { IOS } from "constants/index";
// Libraries
import * as R from "ramda";
// UI Frameworks
import {
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
// Hooks
import { useNavigation } from "@react-navigation/native";
import { Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
// API
import { getHomePageData } from "utils/api";
// Shared components
import Header from "components/header";
import { FormattedText } from "components/format-text";
import Layout from "components/layout";
import ActionModalCentered from "components/modal/actionModalCentered";
import PaymentTransactionResult from "components/PaymentTransactionResult";
import Button from "components/button";
import MaterialTextField from "components/materialTextfield";
// Utils
import { formatNumber } from "utils";
import messages from "utils/fa";
// Types
import { TransferMoneyState } from "store/TransferMoney/transferMoney.reducer";
import { BalanceCardType } from "constants/types";
import { StateNetwork } from "store/index.reducer";
// Actions
import TransferMoneyActions from "store/TransferMoney/transferMoney.actions";
// Images
import Switch from "images/transferMoney/switch.svg";
import SwitchBr from "images/transferMoney/switchBr.svg";
// Styles
import style from "./styles";
import ActionModalBottom from "components/modal/actionModalBottom";
import PickerItem from "./components/PickerItem";
import { withTheme } from "themeCore/themeProvider";
import { getEarningData } from "redux/actions/Earning";

const MessagesContext = React.createContext(messages);
export interface Errors {
  child?: string;
  parent?: string;
  amount?: string;
  description?: string;
}

const TransferMoney: FC = (props: any) => {
  const { cards, header } = props.route.params;
  const theme = props.theme;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const translate = React.useContext(MessagesContext);

  const [parentName, setParentName] = useState<string>("");
  const [parentId, setParentId] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [isFromParent, setIsFromParent] = useState<boolean>(true);
  const [firstSubmitted, setFirstSubmitted] = React.useState(false);
  const [showPicker, setShowPicker] = React.useState(false);
  const [childId, setChildId] = React.useState(0);
  const [childName, setChildName] = React.useState("");

  // Store
  const transferMoneyStore = useSelector<StateNetwork, TransferMoneyState>(
    (state) => state.transferMoney
  );

  useEffect(() => {
    formik.resetForm();
    if (header.id !== "") {
      setParentName(header.nickname);
      setParentId(header.id);
      setAvatar(header.avatar);
    }
  }, []);

  const transactionResults = React.useMemo(() => {
    if (transferMoneyStore.transactionResult?.data) {
      const result = R.map((key: string) => {
        const isAmount = key === "amount";
        return {
          key: translate[key],
          value: isAmount
            ? formatNumber(transferMoneyStore.transactionResult.data[key])
            : transferMoneyStore.transactionResult.data[key],
        };
      }, Object.keys(transferMoneyStore.transactionResult.data));

      return result;
    }
  }, [transferMoneyStore.transactionResult.data]);

  const formik = useFormik({
    initialValues: {
      child: childName,
      parent: parentName,
      amount: "",
      description: "",
    },
    validateOnChange: firstSubmitted,
    validateOnBlur: false,
    validate: (values: any) => {
      const errors: Errors = {};
      setFirstSubmitted(true);
      if (!values.amount) {
        errors.amount = "لطفا مبلغ را وارد نمایید";
      }

      if (!values.description) {
        errors.description = "لطفا توضیحات را وارد نمایید";
      }
      return errors;
    },
    onSubmit: (values: any) => {
      const data = {
        transferFrom: isFromParent ? parentId : childId,
        transferTo: isFromParent ? childId : parentId,
        amount: Number(values.amount),
        description: values.description,
      };
      dispatch(TransferMoneyActions.transferMoney(data, { sagas: true }));
    },
  });

  function handleCloseModal() {
    dispatch(
      TransferMoneyActions.transferMoney({ data: [] }, { sagas: false })
    );
    dispatch(getEarningData(Math.random()));
    navigation.navigate("homeTab");
  }

  function handleSwitch() {
    setIsFromParent(!isFromParent);
  }

  function handleSelectedChild(id: number, nickname: string) {
    setChildId(id);
    setChildName(nickname);
    setShowPicker(false);
  }
  return (
    <Layout>
      <Header
        staticTitle={"transferMoney"}
        handleBack={() => props.navigation.goBack()}
      />
      <KeyboardAvoidingView
        behavior={IOS ? "padding" : "height"}
        style={style.container}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[style.content]}
        >
          <Formik
            initialValues={formik.initialValues}
            onSubmit={(values: any) => formik.handleSubmit(values)}
          >
            <>
              <View style={style.columns}>
                <View style={style.rightCol}>
                  <FormattedText>از</FormattedText>
                  {isFromParent ? (
                    <View
                      style={[
                        style.parentFeild,
                        {
                          borderColor: theme.transferMoney.borderColorInInput,
                          backgroundColor:
                            theme.transferMoney.backgroundInInput,
                        },
                      ]}
                    >
                      <Image
                        source={{ uri: `data:image/png;base64,${avatar}` }}
                        style={style.avatar}
                      />
                      <FormattedText style={style.parentText}>
                        {parentName}
                      </FormattedText>
                    </View>
                  ) : (
                    <TouchableWithoutFeedback
                      onPress={() => setShowPicker(true)}
                    >
                      <View
                        style={[
                          style.childFeild,
                          {
                            borderColor: theme.transferMoney.borderColorInInput,
                            backgroundColor:
                              theme.transferMoney.backgroundInInput,
                          },
                        ]}
                      >
                        <FormattedText>
                          {childName ? childName : "انتخاب کنید "}
                        </FormattedText>
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                  <FormattedText>به</FormattedText>

                  {!isFromParent ? (
                    <View
                      style={[
                        style.parentFeild,
                        {
                          borderColor: theme.transferMoney.borderColorInInput,
                          backgroundColor:
                            theme.transferMoney.backgroundInInput,
                        },
                      ]}
                    >
                      <Image
                        source={{ uri: `data:image/png;base64,${avatar}` }}
                        style={style.avatar}
                      />
                      <FormattedText style={style.parentText}>
                        {parentName}
                      </FormattedText>
                    </View>
                  ) : (
                    <TouchableWithoutFeedback
                      onPress={() => setShowPicker(true)}
                    >
                      <View
                        style={[
                          style.childFeild,
                          {
                            borderColor: theme.transferMoney.borderColorInInput,
                            backgroundColor:
                              theme.transferMoney.backgroundInInput,
                          },
                        ]}
                      >
                        <FormattedText>
                          {childName ? childName : "انتخاب کنید "}
                        </FormattedText>
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                </View>
                <View style={style.leftCol}>
                  <TouchableOpacity onPress={handleSwitch}>
                    {theme.key == "FATHER BLU JUNIOR" ? (
                      <SwitchBr height={60} width={60} />
                    ) : (
                      <Switch height={60} width={60} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ marginTop: "5%" }}>
                <MaterialTextField
                  label="مبلغ"
                  value={formatNumber(formik.values.amount)}
                  onChangeText={(value: string) => {
                    formik.setFieldValue(
                      "amount",
                      value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, "")
                    );
                    if (value.toString().charAt(0) === "0") {
                      formik.setFieldValue("amount", "");
                    }
                  }}
                  hasUnit
                  maxLength={13}
                  error={formik.errors.amount}
                  keyboardType={"number-pad"}
                />

                <MaterialTextField
                  label="توضیحات"
                  value={formik.values.description}
                  onChangeText={(text: string) =>
                    formik.setFieldValue("description", text)
                  }
                  maxLength={55}
                  error={formik.errors.description}
                />
              </View>
              <Button
                title="انتقال وجه"
                style={style.submitButton}
                onPress={formik.handleSubmit}
                disabled={!formik.isValid || transferMoneyStore.loading}
                loading={transferMoneyStore.loading}
                color={theme.ButtonGreenColor}
              />
            </>
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
      <ActionModalBottom
        showModal={showPicker}
        setShowModal={() => setShowPicker(false)}
        showHeader={false}
      >
        <PickerItem
          data={cards.cards}
          onSelectedChild={(id, nickname) => handleSelectedChild(id, nickname)}
        />
      </ActionModalBottom>
      <ActionModalCentered
        showModal={!R.isEmpty(transactionResults)}
        setShowModal={handleCloseModal}
        onBackdropPress={handleCloseModal}
        showCloseBtn={false}
      >
        <PaymentTransactionResult
          data={transactionResults}
          hasError={transferMoneyStore.transactionResult.hasError}
          onClose={handleCloseModal}
          description={transferMoneyStore.transactionResult.data.description}
          message={transferMoneyStore.transactionResult.message}
        />
      </ActionModalCentered>
    </Layout>
  );
};

export default withTheme(TransferMoney);
