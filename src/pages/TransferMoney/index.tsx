import React, { FC, useState, useEffect } from "react";
// Constants
import { colors, IOS, width } from "constants/index";
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
import { Picker } from "@react-native-community/picker";
// Hooks
import { useNavigation } from "@react-navigation/native";
import { Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
// API
import { getHomePageData } from "utils/api";
// Shared components
import Header from "components/header";
import { FormattedText } from "components/format-text";
import Input from "components/input";
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
import Switch from "images/switch.svg";
// Styles
import style from "./styles";
import ActionModalBottom from "components/modal/actionModalBottom";
import PickerItem from "./components/PickerItem";

const MessagesContext = React.createContext(messages);
export interface Errors {
  child?: string;
  parent?: string;
  amount?: string;
  description?: string;
}

const TransferMoney: FC = (props: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const translate = React.useContext(MessagesContext);

  const [cards, setCards] = useState<Array<BalanceCardType>>([]);
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
  const token = useSelector<any, any>((state) => state.user.token);

  useEffect(() => {
    (async () => {
      try {
        const { cards, header } = await getHomePageData(token);

        setCards(cards.cards);
        if (header.id !== "") {
          setParentName(header.nickname);
          setParentId(header.id);
          setAvatar(header.avatar);
        }
      } catch (error) {
        console.warn(error);
      }
    })();
  }, []);

  const transactionResults = React.useMemo(() => {
    if (transferMoneyStore.transactionResult) {
      const result = R.map((key: string) => {
        return {
          key: translate[key],
          value: transferMoneyStore.transactionResult[key],
        };
      }, Object.keys(transferMoneyStore.transactionResult));

      // const filteredResult = R.filter(
      //   (item) => item.name !== "description" && item.name !== "success",
      //   result
      // );
      return result;
    }
  }, [transferMoneyStore.transactionResult]);

  const formik = useFormik({
    initialValues: {
      // child: cards.length > 0 ? cards[0].id : "",
      child: childName,
      parent: parentName,
      amount: "",
      description: "",
    },
    validateOnChange: firstSubmitted,
    validateOnBlur: false,
    validate: (values: any) => {
      console.log("childName", childName);
      const errors: Errors = {};
      setFirstSubmitted(true);
      if (!values.amount) {
        errors.amount = "لطفا مبلغ را وارد نمایید";
      }
      if (!values.child) {
        errors.child = "لطفا یک مورد را انتخاب نمایید";
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
      console.log("data", data);
      dispatch(TransferMoneyActions.transferMoney(data, { sagas: true }));
      formik.resetForm();
    },
  });

  function handleCloseModal() {
    dispatch(TransferMoneyActions.transferMoney([], { sagas: false }));
    navigation.navigate("home");
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
        <ScrollView contentContainerStyle={[style.content]}>
          <Formik
            initialValues={formik.initialValues}
            onSubmit={(values: any) => formik.handleSubmit(values)}
          >
            <>
              <View style={style.columns}>
                <View style={style.rightCol}>
                  <FormattedText>از</FormattedText>
                  {isFromParent ? (
                    <View style={style.parentFeild}>
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
                      <View style={style.childFeild}>
                        <FormattedText>
                          {formik.values.child
                            ? formik.values.child
                            : "انتخاب کنید "}
                        </FormattedText>
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                  <FormattedText>به</FormattedText>

                  {!isFromParent ? (
                    <View style={style.parentFeild}>
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
                      <View style={style.childFeild}>
                        <FormattedText>
                          {childName ? childName : "انتخاب کنید "}
                        </FormattedText>
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                </View>
                <View style={style.leftCol}>
                  <TouchableOpacity onPress={handleSwitch}>
                    <Switch height={60} width={60} />
                  </TouchableOpacity>
                </View>
              </View>

              <MaterialTextField
                label="مبلغ"
                value={formatNumber(formik.values.amount)}
                onChangeText={(value: string) =>
                  formik.setFieldValue("amount", value.replace(/,/g, ""))
                }
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
                maxLength={13}
                error={formik.errors.description}
              />

              <Button
                title="انتقال وجه"
                style={style.submitButton}
                onPress={formik.handleSubmit}
                disabled={
                  !formik.isValid ||
                  !formik.values.amount ||
                  !formik.values.description ||
                  !formik.values.child ||
                  transferMoneyStore.loading
                }
                loading={transferMoneyStore.loading}
                color="#43e6c5"
              />
            </>
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
      <ActionModalBottom
        showModal={showPicker}
        setShowModal={() => setShowPicker(false)}
        backdropOpacity={0.3}
        showHeader={false}
      >
        <PickerItem
          data={cards}
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
          //status={transferMoneyStore.transactionResult.success}
          status={true}
          description="پرداخت موفق"
          //description={transferMoneyStore.transactionResult.description}
          onClose={handleCloseModal}
        />
      </ActionModalCentered>
    </Layout>
  );
};

export default TransferMoney;
