import { colors } from "constants/index";
import { fontFamily, fontSize } from "global";
import React, { useState, useRef } from "react";
import { View, StyleSheet, LayoutAnimation, ScrollView } from "react-native";
import Button from "components/button";
import { getAddressByPostalCode } from "utils/api";
import { useSelector } from "react-redux";
import MaterialTextInput from "components/materialTextfield";
import { RootState } from "../../../../customType";
import { FormattedText } from "components/format-text";
import { withTheme } from "themeCore/themeProvider";

type Props = {
  handleGetAddressDetail: (T: {
    province: string;
    city: string;
    address: string;
    postalCode: string;
    street: string;
    buildingNo: string;
    floor: string;
    phone: string;
  }) => void;
  theme: any;
};

const PostalCodeInquiry = ({ handleGetAddressDetail, theme }: Props) => {
  const [error, setError] = useState<any>({ field: "", message: "" });
  const [loading, setLoading] = useState(false);
  const postalCodeRef = useRef(null);
  const phoneRef = useRef(null);
  const token = useSelector<RootState, any>((state) => state.user.token);
  const [postalCode, setPostalcode] = useState("");
  const [phone, setPhone] = useState("");

  const clearError = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        200,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
      )
    );
    setError({
      field: "",
      message: "",
    });
  };

  const handleTouch = () => {
    clearError();
    setLoading(true);
    getAddressByPostalCode(token, postalCode)
      .then((response: any) => {
        logger(response);
        setLoading(false);
        if (response.status == 200) {
          const data = response.data;
          const province = data.province;
          const city = data.city;
          const street = data.street;
          const buildingNo = data.buildingNo;
          const floor = data.floor;
          const address =
            response.data.province +
            " - " +
            response.data.city +
            " - " +
            response.data.avenue +
            " - پلاک " +
            response.data.buildingNo +
            " - طبقه " +
            response.data.floor;
          handleGetAddressDetail({
            province,
            city,
            street,
            buildingNo,
            floor,
            address,
            postalCode,
            phone,
          });
        } else {
          LayoutAnimation.configureNext(
            LayoutAnimation.create(
              200,
              LayoutAnimation.Types.easeInEaseOut,
              LayoutAnimation.Properties.opacity
            )
          );
          setError({ field: "error", message: "خطای شبکه" });
        }
      })
      .catch((err) => {
        console.log(err.response);
        logger(err.response);
        LayoutAnimation.configureNext(
          LayoutAnimation.create(
            200,
            LayoutAnimation.Types.easeInEaseOut,
            LayoutAnimation.Properties.opacity
          )
        );
        setError({ field: "error", message: err.response.data.message });
        setLoading(false);
      });
  };

  const onPostalCodeChanged = (code: string) => {
    setPostalcode(code);
  };

  const onTelephoneChanged = (phoneNumber: string) => {
    setPhone(phoneNumber);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View>
        <FormattedText style={styles.title}>
          لطفا کد پستی آدرسی که می‌خواهید کارت به آن ارسال شود را وارد کنید.{" "}
        </FormattedText>
        <MaterialTextInput
          placeholder="کدپستی"
          keyboardType="phone-pad"
          maxLength={10}
          value={postalCode}
          ref={postalCodeRef}
          nextRef={phoneRef}
          inputStyle={styles.inputStyle}
          returnKeyType="next"
          onChange={clearError}
          onChangeText={onPostalCodeChanged}
        />
        <MaterialTextInput
          placeholder="شماره تلفن ثابت"
          keyboardType="phone-pad"
          maxLength={11}
          value={phone}
          ref={phoneRef}
          onChange={clearError}
          inputStyle={styles.inputStyle}
          returnKeyType="send"
          onSubmitEditing={() => handleTouch()}
          onChangeText={onTelephoneChanged}
          isError={error.field === "error"}
          error={error.field === "error"}
        />
      </View>
      <Button
        style={styles.btn}
        color={theme.ButtonBlueColor}
        title="استعلام آدرس"
        onPress={handleTouch}
        loading={loading}
        disabled={postalCode.length != 10 || phone.length != 11 || loading}
      />
    </ScrollView>
  );
};
export default withTheme(PostalCodeInquiry);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 18,
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
    marginTop: 18,
    lineHeight: 27,
    marginBottom: 30,
  },
  errorText: {
    fontFamily: fontFamily.yekanNormal,
    fontSize: fontSize.small,
    fontWeight: "normal",
    textAlign: "left",
    color: colors.eggplant,
    marginLeft: 5,
  },
  inputError: { color: colors.pinkRed, marginLeft: 5 },
  inputStyle: {
    fontSize: 16,
  },
});
