import { colors, IOS } from "constants/index";
import { fontFamily, fontSize } from "global";
import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Button from "components/button";
import MaterialTextInput from "components/materialTextfield";
import { withTheme } from "themeCore/themeProvider";

const Address = ({
  theme,
  handleConfirm,
  loading,
  originalCity,
  originalAddress,
  originalProvince,
}: any) => {
  const [city, setCity] = useState(originalCity || "");
  const [province, setProvince] = useState(originalProvince || "");
  const [address, setAddress] = useState(originalAddress || "");
  const cityRef = useRef(null);
  const provinceRef = useRef(null);
  const addressRef = useRef(null);

  return (
    <KeyboardAvoidingView
      contentContainerStyle={styles.container}
      behavior={IOS ? "padding" : "height"}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          لطفا آدرس را تایید یا در صورت نیاز آن را ویرایش کنید.
        </Text>
        <Text style={styles.label}>استان:</Text>
        <MaterialTextInput
          value={province}
          ref={provinceRef}
          nextRef={cityRef}
          returnKeyType="next"
          onChangeText={setProvince}
        />
        <Text style={styles.label}>شهر:</Text>
        <MaterialTextInput
          value={city}
          ref={cityRef}
          nextRef={addressRef}
          returnKeyType="next"
          onChangeText={setCity}
        />
        <Text style={styles.label}>آدرس:</Text>
        <MaterialTextInput
          value={address}
          ref={addressRef}
          returnKeyType="send"
          onChangeText={setAddress}
          style={styles.inputAddress}
          multiline
          noIcon
        />
      </ScrollView>
      <Button
        style={styles.btn}
        color={theme.ButtonGreenColor}
        title="تائید و سفارش"
        loading={loading}
        disabled={loading}
        onPress={() => handleConfirm({ province, city, address })}
      />
    </KeyboardAvoidingView>
  );
};

export default withTheme(Address);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 5,
  },
  btn: {
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 28,
  },
  title: {
    fontSize: fontSize.large,
    fontFamily: fontFamily.yekanNormal,
    color: colors.eggplant,
    textAlign: "left",
    marginTop: 5,
    marginBottom: 15,
    lineHeight: 24,
  },
  label: {
    fontSize: fontSize.large,
    fontFamily: fontFamily.yekanNormal,
    color: colors.eggplant,
    textAlign: "left",
    marginBottom: 6,
    marginTop: 6,
  },
  inputAddress: {
    minHeight: 120,
    textAlignVertical: "top",
    textAlign: "right",
    fontFamily: "IRANYekanMobileFaNum",
  },
});
