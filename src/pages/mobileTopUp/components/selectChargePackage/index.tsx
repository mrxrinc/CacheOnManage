import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { FormattedText } from "components/format-text";
import styles from "./styles";
import Note from "components/icons/note.svg";
import Button from "components/button";
import { colors } from "constants/index";
import Input from "components/input";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, NavigationProp } from "@react-navigation/core";
import { StackParamList } from "navigation/mobileTopUp-stack-navigator";
import { formatNumber } from "utils/index";

const data = [
  { id: 1, amount: "10000" },
  { id: 2, amount: "20000" },
  { id: 3, amount: "50000" },
  { id: 4, amount: "100000" },
  { id: 5, amount: "150000" },
  { id: 6, amount: "200000" },
];

type Navigation = NavigationProp<StackParamList>;

const SelectChargePackage = () => {
  const navigation = useNavigation<Navigation>();
  const [amount, setAmount] = useState("");
  const [active, setActive] = useState(null);

  const renderRow = (item: any, index: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setAmount(item.amount);
          setActive(index);
        }}
        style={[
          styles.amountBox,
          { backgroundColor: active == index ? "#43e6c5" : "#f4f6fa" },
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
    <View style={styles.container}>
      <View style={styles.descriptionBox}>
        <Note width={16} height={16} />
        <FormattedText
          style={styles.descriptionText}
          id="mobileTopUp.paymentDescription"
        />
      </View>
      <View style={styles.inputBox}>
        <FormattedText style={styles.inputBoxText}>مبلغ</FormattedText>
        <View style={styles.inputPack}>
          <Input
            placeholder={"مبلغ دلخواه"}
            customStyle={{ width: 150, height: 44 }}
            boxMode
            maxLength={13}
            keyboardType={"number-pad"}
            onChangeText={(value: string) => setAmount(value)}
            value={formatNumber(amount)}
          />
          <FormattedText style={styles.inputBoxText}>ریال</FormattedText>
        </View>
      </View>
      <View style={styles.chargePackageBox}>
        <View style={styles.chargeBox}>
          <FlatList
            numColumns={3}
            contentContainerStyle={styles.flatList}
            data={data}
            renderItem={({ item, index }) => renderRow(item, index)}
          />
        </View>
      </View>
      <View style={styles.button}>
        <Button
          color={colors.buttonOpenActive}
          title="پرداخت"
          disabled={amount == "" ? true : false}
          // onPress={handleBiometricsAction}
          onPress={() =>
            navigation.navigate("verifyPayment", {
              topUpAmount: amount,
            })
          }
        />
      </View>
    </View>
  );
};
export default SelectChargePackage;
