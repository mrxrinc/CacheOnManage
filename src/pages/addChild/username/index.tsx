import React, { FC, useState, useEffect, useRef } from "react";
import { View, ScrollView } from "react-native";
import { FormattedText } from "components/format-text";
import Header from "components/header";
import Layout from "components/layout";
import { colors } from "constants/index";
import style from "./style";
import Button from "components/button";
import Checkbox from "components/checkbox";
import { RootState } from "../../../../customType";
import { useDispatch, useSelector } from "react-redux";
import MaterialTextField from "components/materialTextfield";
import { validateUserName } from "utils/validators";
import { addChild } from "utils/api";
import { withTheme } from "themeCore/themeProvider";

type FormType = {
  username: string;
  password: string;
};

const ChildUser = (props: any) => {
  const theme = props.theme.addChild;
  const token = useSelector<RootState, any>((state) => state.user.token);
  const [error, setError] = useState<any>({ field: "", message: "" });
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
    clearError();
    const { username, password } = form;
    const { params } = props.route;
    const data = {
      ...params,
      username,
      password,
    };
    addChild(token, data)
      .then((response: any) => {
        setLoading(false);
        props.navigation.push("result", response.data);
      })
      .catch((err: any) => {
        setLoading(false);
        console.warn("err", err.response);
        setError({
          field: "addChild",
          message: `${err.response.status} - ${err.response.data.message}`,
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
      <Header
        staticTitle={"childAccount"}
        handleBack={() => props.navigation.goBack()}
      />
      <ScrollView contentContainerStyle={style.container}>
        <View style={style.contentWrapper}>
          <MaterialTextField
            label="نام کاربری دلخواه"
            title="نام کاربری باید با حروف انگلیسی باشد و با عدد شروع نشود."
            titleTextStyle={{ color: colors.title }}
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
          <View style={style.validatorRow}>
            <Checkbox
              color={theme.mainButton}
              disabled
              showActive={passwordValidator.atleast8Chars}
            />
            <FormattedText style={style.validatorText}>
              حداقل 8 کاراکتر
            </FormattedText>
          </View>
          <View style={style.validatorRow}>
            <Checkbox
              color={theme.mainButton}
              disabled
              showActive={passwordValidator.bothCases}
            />
            <FormattedText style={style.validatorText}>
              استفاده از حروف بزرگ و کوچک
            </FormattedText>
          </View>
          <View style={style.validatorRow}>
            <Checkbox
              color={theme.mainButton}
              disabled
              showActive={passwordValidator.hasNumber}
            />
            <FormattedText style={style.validatorText}>
              استفاده از اعداد
            </FormattedText>
          </View>

          <View style={{ marginTop: 30 }}>
            <Button
              title="تایید و ادامه"
              onPress={handleAddChild}
              disabled={!readyToSubmit}
              loading={loading}
              color={theme.mainButton}
            />
          </View>

          {error.field === "addChild" && (
            <FormattedText
              style={{ color: colors.red, marginTop: 30, textAlign: "center" }}
            >
              {error.message}
            </FormattedText>
          )}
        </View>
      </ScrollView>
    </Layout>
  );
};

export default withTheme(ChildUser);
