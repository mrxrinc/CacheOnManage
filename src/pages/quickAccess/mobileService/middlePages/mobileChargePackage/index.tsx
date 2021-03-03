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
  const RenderRow = (props: any) => {
    const { item, index, isMobileCharge }: any = props;
    return (
      <TouchableOpacity
        onPress={() => {
          setAmount(item.amount);
          setActive(index);
        }}
        style={[
          styles.amountBox,
          {
            backgroundColor:
              active === index ? colors.buttonSubmitActive : colors.gray900,
            marginBottom: isMobileCharge ? 20 : 0,
          },
        ]}
      >
        {
          <FormattedText
            fontFamily="Regular-FaNum"
            style={[
              styles.chargeTextAmount,
              { color: active == index ? colors.white : colors.title },
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
      <Header staticTitle={rootPage} handleBack={() => navigation.goBack()} />
      <MobileInfo />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
      >
        <View style={styles.content}>
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
            columnWrapperStyle={styles.columnWrapper}
            data={data}
            renderItem={({ item, index }) => (
              <RenderRow item={item} index={index} isMobileCharge />
            )}
          />
        </View>
        <Button
          color={colors.buttonOpenActive}
          style={styles.button}
          title="پرداخت"
          disabled={amount === "" || amount.toString().charAt(0) === "0"}
          onPress={() => {
            navigation.navigate("quickAccessPayment", {
              data: {
                amount: amount,
                type: "mobileTopUp",
              },
            });
          }}
        />
      </KeyboardAwareScrollView>
    </Layout>
  );
};
export default SelectChargePackage;
