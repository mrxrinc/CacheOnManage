import React, { FC, useState, useEffect } from "react";
// Constants
import { colors, IOS } from "constants/index";
// Libraries
import * as R from "ramda";
// UI Frameworks
import {
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
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
import { RootState } from "customType";
import { StateNetwork } from "store/index.reducer";
// Actions
import TransferMoneyActions from "store/TransferMoney/transferMoney.actions";
// Images
import Switch from "images/switch.svg";
// Styles
import style from "./styles";

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

  // Store
  const transferMoneyStore = useSelector<StateNetwork, TransferMoneyState>(
    (state) => state.transferMoney
  );
  const token = useSelector<RootState, any>((state) => state.user.token);

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
          name: translate[key],
          title: transferMoneyStore.transactionResult[key],
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
      child: cards.length > 0 ? cards[0].id : "",
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
      return errors;
    },
    onSubmit: (values: any) => {
      const data = {
        transferFrom: isFromParent ? parentId : values.child,
        transferTo: isFromParent ? values.child : parentId,
        amount: Number(values.amount),
        description: values.description,
      };
      dispatch(TransferMoneyActions.transferMoney(data, { sagas: true }));
    },
  });

  function handleCloseModal() {
    dispatch(TransferMoneyActions.transferMoney([], { sagas: false }));
    navigation.navigate("home");
  }

  function handleSwitch() {
    setIsFromParent(!isFromParent);
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
                    <>
                      <View style={style.childFeild}>
                        <Picker
                          selectedValue={formik.values.child}
                          onValueChange={(name) =>
                            formik.setFieldValue("child", name)
                          }
                        >
                          {cards.map((card) => {
                            return (
                              <Picker.Item
                                key={card.id}
                                label={card.nickname}
                                value={card.id}
                              />
                            );
                          })}
                        </Picker>
                      </View>
                    </>
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
                    <>
                      <View style={style.childFeild}>
                        <Picker
                          selectedValue={formik.values.child}
                          onValueChange={(name) =>
                            formik.setFieldValue("child", name)
                          }
                          itemStyle={style.pickerItems}
                        >
                          {cards.map((card) => {
                            return (
                              <Picker.Item
                                key={card.id}
                                label={card.nickname}
                                value={card.id}
                              />
                            );
                          })}
                        </Picker>
                      </View>
                    </>
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

              <Input
                onChangeText={(text: string) =>
                  formik.setFieldValue("description", text)
                }
                value={formik.values.description}
                placeholder={"توضیحات"}
                placeholderTextColor={colors.gray600}
                style={style.input}
              />
              <View style={style.submitButtonWrapper}>
                <Button
                  title="انتقال وجه"
                  style={style.submitButton}
                  onPress={formik.handleSubmit}
                  disabled={!formik.isValid || transferMoneyStore.loading}
                  loading={transferMoneyStore.loading}
                  color="#43e6c5"
                />
              </View>
            </>
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
      <ActionModalCentered
        showModal={!R.isEmpty(transactionResults)}
        setShowModal={handleCloseModal}
        onBackdropPress={handleCloseModal}
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
