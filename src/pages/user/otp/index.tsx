import React, { useState } from "react";
import {
  Image,
  Dimensions,
  TouchableOpacity,
  View,
  StyleSheet,
  Switch,
} from "react-native";
import { phoneNumberChanged, signUpStepChanged } from "redux/actions/User";
import { sendVerifyCode } from "utils/api";
import { useDispatch } from "react-redux";
import { FormattedText } from "components/format-text";
import errorIcon from "images/error.png";
import { validatePhone, validateNationalId } from "utils/validators";
import MaterialTextField from "components/materialTextfield";
import Button from "components/button";
import { colors } from "constants/index";

const Otp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [phoneIsValide, setPhoneIsValide] = useState(false);
  const [nationalIdIsValid, setNationalIdIsValid] = useState(false);
  const [nationalId, setNationalId] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<any>({ field: "", message: "" });
  const [switchValue, setSwitchValue] = useState(false);
  const clearError = () => {
    setError({
      field: "",
      message: "",
    });
  };

  const toggleSwitch = (value: boolean) => {
    setSwitchValue(value);
  };

  const handleTouch = () => {
    setLoading(true);
    sendVerifyCode(phone, nationalId)
      .then((response: any) => {
        if (response.status == 200) {
          setLoading(false);
          dispatch(signUpStepChanged("verifyCode"));
        } else {
          setError({ field: "serverError", message: "خطا شبکه" });
        }
      })
      .catch((err) => {
        setError({ field: "serverError", message: err.response.data.message });
        setLoading(false);
      });
  };
  const onPhoneChanged = (phone: string) => {
    setPhone(phone);
    dispatch(phoneNumberChanged(phone));
    setPhoneIsValide(false);
    if (phone.length == 11) {
      validatePhone(phone)
        ? setPhoneIsValide(true)
        : setError({
            field: "invalidPhone",
            message: "شماره موبایل صحیح نیست",
          });
    }
  };
  const onNationalIdChanged = (text: string) => {
    setNationalId(text);
    setNationalIdIsValid(false);
    if (text.length == 10) {
      console.log("data is", validateNationalId(text));
      validateNationalId(text)
        ? setNationalIdIsValid(true)
        : setError({
            field: "invalidNationalId",
            message: "شماره ملی اشتباه است",
          });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputPack}>
        <View style={styles.textInputBox}>
          <MaterialTextField
            label="کد ملی"
            keyboardType="phone-pad"
            maxLength={10}
            onChange={clearError}
            onChangeText={onNationalIdChanged}
            value={nationalId}
            error={error.field === "invalidNationalId" ? error.message : null}
          />
        </View>
        <View style={[styles.textInputBox]}>
          <MaterialTextField
            label="شماره همراه"
            keyboardType="phone-pad"
            maxLength={11}
            onChange={clearError}
            onChangeText={onPhoneChanged}
            value={phone}
            error={error.field === "invalidPhone" ? error.message : null}
          />
        </View>
        {error.field == "serverError" && (
          <View style={styles.errorBox}>
            <Image source={errorIcon} style={{ width: 16, height: 16 }} />
            <FormattedText style={styles.errorText}>
              {error.message}
            </FormattedText>
          </View>
        )}
      </View>
      <View style={styles.switch}>
        <Switch
          onValueChange={toggleSwitch}
          value={switchValue}
          trackColor={{ false: "#767577", true: "#0c96ff" }}
          thumbColor={"#f4f3f4"}
        />
        <FormattedText style={{ fontSize: 12 }}>پذیرش </FormattedText>
        <TouchableOpacity>
          <FormattedText style={{ fontSize: 12, color: "#0c96ff" }}>
            قوانین و مقررات
          </FormattedText>
        </TouchableOpacity>
      </View>
      <View style={[styles.Button]}>
        <Button
          color={colors.buttonSubmitActive}
          title="تایید و ادامه"
          onPress={() => handleTouch()}
          disabled={!switchValue && true}
          loading={loading}
        />
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.89,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputPack: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: width * 0.89,
    height: height * 0.28,
    marginTop: "2%",
  },
  errorBox: {
    width: width * 0.85,
    height: height * 0.04,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  errorText: {
    fontSize: 12,
    color: "#f52727",
    marginLeft: "2%",
  },
  Button: {
    width: width * 0.89,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: "15%",
  },
  touch: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  textButton: {
    color: "white",
    fontSize: 20,
  },
  switch: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    width: width * 0.89,
  },
  textInputBox: {
    width: width * 0.89,
    height: 70,
  },
});
export default Otp;
