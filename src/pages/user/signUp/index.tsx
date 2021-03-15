import React, { FC, useState, useEffect, useRef } from "react";
import { View, ScrollView, StyleSheet, Dimensions, Image } from "react-native";
import { FormattedText } from "components/format-text";
import { signUpStepChanged, otpTokenChanged } from "redux/actions/User";
import Layout from "components/layout";
import { colors } from "constants/index";
import Button from "components/button";
import Checkbox from "components/checkbox";
import { RootState } from "../../../../customType";
import { useDispatch, useSelector } from "react-redux";
import MaterialTextField from "components/materialTextfield";
import { validateUserName } from "utils/validators";
import { register } from "utils/api";
import errorIcon from "images/error.png";

type FormType = {
  username: string;
  password: string;
};

export default (props: any) => {
  const dispatch = useDispatch();
  const token = useSelector<RootState, any>((state) => state.user.token);
  const [error, setError] = useState<any>({ field: "", message: "" });
  const [readyToSubmit, setReadyToSubmit] = useState<boolean>(false);
  const [form, setForm] = useState<FormType>({
    username: "",
    password: "",
  });
  const [passwordValidator, setPasswordValidator] = useState<any>({
    atleast8Chars: false,
    bothCases: false,
    hasNumber: false,
  });

  useEffect(() => {
    handleBeingReadyToSubmit();
  }, [form]);

  const handleBeingReadyToSubmit = () => {
    let { username, password } = form;
    username = username.trim();
    password = password.trim();
    if (username.length > 0 && password.length > 0) {
      if (
        validateUserName(username) &&
        passwordValidator.atleast8Chars &&
        passwordValidator.bothCases &&
        passwordValidator.hasNumber
      ) {
        setReadyToSubmit(true);
      }
    } else {
      setReadyToSubmit(false);
    }
    return false;
  };

  const handleUsernameValidator = (value: string) => {
    const username = value.trim();
    if (
      username.length > 0 &&
      (!validateUserName(username) || checkHasNumber(username[0]))
    ) {
      setError({
        field: "username",
        message: "نام کاربری باید با حروف انگلیسی باشد و با عدد شروع نشود.",
      });
    }
  };

  const handlePasswordValidator = (value: string) => {
    const password = value.trim();
    setPasswordValidator({
      atleast8Chars: password.length > 7 ? true : false,
      bothCases: checkBothCases(password) ? true : false,
      hasNumber: checkHasNumber(password) ? true : false,
    });
  };

  const checkBothCases = (str: string) => {
    let result = false;
    if (str.match(/[A-Z]/) && str.match(/[a-z]/)) return true;
    return result;
  };

  const checkHasNumber = (str: string) => {
    let result = false;
    if (str.match(/[0-9]/)) return true;
    return result;
  };

  const _updateForm = (k: string, v: string) => {
    setForm({ ...form, [k]: v });
  };

  const handleAddChild = () => {
    clearError();
    const { username, password } = form;
    const data = {
      username,
      password,
    };
    register(token, data)
      .then((response: any) => {
        dispatch(otpTokenChanged(response.data.access_token));
        dispatch(signUpStepChanged("checkInfo"));
      })
      .catch((err: any) => {
        setError({
          field: "error",
          message: err.response.data.message,
        });
      });
  };

  const clearError = () => {
    setError({
      field: "",
      message: "",
    });
  };

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.contentWrapper}>
          <MaterialTextField
            label="نام کاربری دلخواه"
            title="نام کاربری باید با حروف انگلیسی باشد و با عدد شروع نشود."
            onChange={clearError}
            onChangeText={(value: any) => {
              _updateForm("username", value);
              handleUsernameValidator(value);
            }}
            error={error.field === "username" ? error.message : null}
          />
          <MaterialTextField
            label="رمز عبور دلخواه"
            icon="password"
            onChangeText={(value: any) => {
              _updateForm("password", value);
              handlePasswordValidator(value);
            }}
          />
          {error.field == "error" && (
            <View style={styles.errorBox}>
              <Image source={errorIcon} style={{ width: 16, height: 16 }} />
              <FormattedText style={styles.errorText}>
                {error.message}
              </FormattedText>
            </View>
          )}
          <View style={styles.validatorRow}>
            <Checkbox
              color={colors.buttonSubmitActive}
              disabled
              showActive={passwordValidator.atleast8Chars}
            />
            <FormattedText style={styles.validatorText}>
              حداقل 8 کاراکتر
            </FormattedText>
          </View>
          <View style={styles.validatorRow}>
            <Checkbox
              color={colors.buttonSubmitActive}
              disabled
              showActive={passwordValidator.bothCases}
            />
            <FormattedText style={styles.validatorText}>
              استفاده از حروف بزرگ و کوچک
            </FormattedText>
          </View>
          <View style={styles.validatorRow}>
            <Checkbox
              color={colors.buttonSubmitActive}
              disabled
              showActive={passwordValidator.hasNumber}
            />
            <FormattedText style={styles.validatorText}>
              استفاده از اعداد
            </FormattedText>
          </View>

          <View style={{ marginTop: 30 }}>
            <Button
              title="تایید و ادامه"
              onPress={handleAddChild}
              disabled={!readyToSubmit}
              color={colors.buttonSubmitActive}
            />
          </View>
        </View>
      </ScrollView>
    </Layout>
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
  scrollView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    color: colors.title,
    fontSize: 14,
    paddingVertical: 20,
  },
  validatorRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  validatorText: {
    color: colors.title,
    marginLeft: 10,
  },
  errorBox: {
    width: width * 0.89,
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
});
