import React, { useState } from "react";
import { View, FlatList, TextInput } from "react-native";
import { FormattedText } from "components/format-text";
import styles from "./styles";
import Button from "components/button";
import { colors } from "constants/index";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { formatNumber } from "utils/index";
import MobileInfo from "../../mobileInfo";
import Layout from "components/layout";
import Header from "components/header";
import { useSelector } from "react-redux";
import { RootStateType } from "../../../../../../customType";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const data = [
  { id: 1, amount: "10000" },
  { id: 2, amount: "20000" },
  { id: 3, amount: "50000" },
  { id: 4, amount: "100000" },
  { id: 5, amount: "150000" },
  { id: 6, amount: "200000" },
];
const SelectChargePackage = () => {
  const navigation = useNavigation();
  const rootPage = useSelector<RootStateType, any>(
    (state) => state.quickAccess.rootPage
  );
  const [amount, setAmount] = useState("");
  const [active, setActive] = useState(null);
  const renderRow = (item: any, index: any, isMobileCharge: boolean) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setAmount(item.amount);
          setActive(index);
        }}
        style={[
          styles.amountBox,
          {
            backgroundColor: active == index ? "#43e6c5" : "#f4f6fa",
            marginBottom: isMobileCharge ? 20 : 0,
          },
        ]}
      >
        {
          <FormattedText
            fontFamily="Regular-FaNum"
            style={[
              styles.chargeTextAmount,
              { color: active == index ? "#fff" : "#00015d" },
            ]}
          >
            {formatNumber(item.amount)}
          </FormattedText>
        }
      </TouchableOpacity>
    );
  };
  return (
    <Layout>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Header staticTitle={rootPage} handleBack={() => navigation.goBack()} />
        <MobileInfo />
        <View style={styles.inputBox}>
          <FormattedText style={styles.inputBoxText}>مبلغ</FormattedText>
          <View style={styles.inputPack}>
            <TextInput
              placeholder="مبلغ دلخواه"
              placeholderTextColor={colors.gray500}
              maxLength={13}
              keyboardType={"number-pad"}
              onChangeText={(value: string) => {
                setAmount(value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ""));
                setActive(null);
              }}
              value={formatNumber(amount)}
              style={styles.input}
            />
            <FormattedText style={styles.rial}>ریال</FormattedText>
          </View>
        </View>
        <FlatList
          numColumns={3}
          style={styles.flatList}
          columnWrapperStyle={{ flex: 1, justifyContent: "space-between" }}
          data={data}
          renderItem={({ item, index }) => renderRow(item, index, true)}
        />
      </KeyboardAwareScrollView>
      <Button
        color={colors.buttonOpenActive}
        style={styles.button}
        title="پرداخت"
        disabled={amount == "" ? true : false}
        onPress={() => {
          const data = {
            amount: amount,
            type: "mobileTopUp",
          };
          navigation.navigate("quickAccessPayment", { data });
        }}
      />
    </Layout>
  );
};
export default SelectChargePackage;
