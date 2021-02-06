import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  StatusBar,
  TouchableHighlight,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import * as Keychain from "react-native-keychain";
import { FormattedText } from "components/format-text";
import { otpTokenChanged } from "redux/actions/User";
import { useNavigation } from "@react-navigation/core";
import {
  childPhoneNumber,
  mobileOperatorName,
} from "store/QuickAccess/quickAccess.actions";
import Button from "components/button";
import styles from "./styles";
import { colors } from "constants/index";
import Fingerprint from "images/signIn/fingerprint.svg";
import FaceIDIcon from "images/signIn/face-detection.svg";
import { login } from "utils/api";
import { validateUserName } from "utils/validators";
import MaterialTextField from "components/materialTextfield";
import { RootState, RootStateType } from "../../../../../customType";
import SupportController from "components/supportController";
import { setLocalData, getLocalData } from "utils/localStorage";
import FanButton from "../fanBoutton";
import { withTheme } from "themeCore/themeProvider";
import Logo from "images/blu-logo.svg";
import Header from "./header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoginBtn from "./loginBtn";
interface IError {
  errorText: string;
  isError: boolean;
}

// type BiometricType = "Fingerprint" | "Face" | "TouchID" | "FaceID" | null;

const Login = ({ theme }: any) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("ali_baba");
  const [password, setPassword] = useState("Aa1234567");
  const [loading, setLoading] = useState(false);
  const [isBio, setIsBio] = useState(false);
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const [
    biometricType,
    setBiometricType,
  ] = useState<Keychain.BIOMETRY_TYPE | null>(null);
  const [supportModal, setSupportModal] = useState<boolean>(false);
  const isChild = useSelector<RootState, any>((state) => state.user.ischild);
  const clearError = () => {
    setError({
      field: "",
      message: "",
    });
  };
  const [error, setError] = useState<IError>({
    errorText: "",
    isError: false,
  });
  const childPhoneNum = useSelector<RootStateType, any>(
    (state) => state.quickAccess.childPhone || ""
  );
  const dispatch = useDispatch();
  AsyncStorage.getItem("childPhone").then((childPhone) => {
    dispatch(childPhoneNumber(childPhone));
  });
  const isFinger =
    biometricType === "TouchID" || biometricType === "Fingerprint";
  const isFace = biometricType === "FaceID";
  useEffect(() => {
    handleBiometricTypeCheck();
    // setShowBiometricModal(true);
    // handleBiometricsAction();
    if (childPhoneNum.match(/^093/i) || childPhoneNum.match(/^090/i)) {
      dispatch(mobileOperatorName("IRANCELL"));
    } else if (childPhoneNum.match(/^091/i)) {
      dispatch(mobileOperatorName("MCI"));
    } else {
      dispatch(mobileOperatorName("RIGHTEL"));
    }
  }, []);
  const handleBiometricTypeCheck = async () => {
    const biometricsType = await Keychain.getSupportedBiometryType();
    const checkWasAssigened = await getLocalData("biometrics");
    setBiometricType(biometricsType);
    if (checkWasAssigened) {
      setIsBio(true);
      handleBiometricsAction(true);
    }
  };

  const handleTouch = async (username: string, password: string) => {
    setLoading(true);
    if (validateUserName(username)) {
      login(username, password, isChild)
        .then((response: any) => {
          console.log(response);
          setLoading(false);
          if (response.status == 200) {
            dispatch(otpTokenChanged(response.data.access_token));
            AsyncStorage.setItem("token", response.data.access_token);
            AsyncStorage.getItem("token").then((token) => {});
            if (biometricType) {
              (async () => {
                const checkWasAssigened = await getLocalData("biometrics");
                if (!checkWasAssigened) {
                  setShowBiometricModal(true);
                } else {
                  navigation.navigate("app");
                  setUsername("");
                  setPassword("");
                }
              })();
            } else {
              navigation.navigate("app");
              setUsername("");
              setPassword("");
            }
          } else {
            setError({
              errorText: "نام کاربری یا کلمه عبور اشتباه است",
              isError: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError({ errorText: err.response.data.message, isError: true });
        });
    } else {
      setLoading(false);
      setError({ errorText: "نام کاربری باید لاتین باشد", isError: true });
    }
  };

  const handleSetBiometricsLogin = async () => {
    setShowBiometricModal(false);
    // Store the credentials
    try {
      await Keychain.setGenericPassword(username, password, {
        service: "MoneyApp",
        accessControl: "BiometryAny",
        accessible: "AccessibleWhenPasscodeSetThisDeviceOnly",
      });
      await setLocalData("biometrics", "true");
      setUsername("");
      setPassword("");
      setTimeout(() => {
        navigation.navigate("app");
      }, 500);
    } catch (error) {
      console.warn("ERROR ON SETTING BIOMETCIS ", error);
    }
  };

  const handleBiometricsAction = async (firstTime: boolean = false) => {
    try {
      // Retrieve the credentials
      const options: any = {
        service: "MoneyApp",
        accessControl: "BIOMETRY_ANY_OR_DEVICE_PASSCODE",
        authenticationPrompt: {
          title: "ورود با اثر انگشت",
          description: "لطفا انگشت خود را بر روی حسگر گوشی قرار دهید",
          cancel: "انصراف",
        },
      };
      const credentials = await Keychain.getGenericPassword(options);
      if (credentials) {
        setUsername(credentials.username);
        setPassword(credentials.password);
        handleTouch(credentials.username, credentials.password);
      } else {
        setError({
          errorText: "اثر انگشت شما ثبت نشده است",
          isError: true,
        });
      }
    } catch (error) {
      if (!firstTime) {
        setError({
          errorText: "شناسایی اثر انگشت با مشکل روبرو شد",
          isError: true,
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colors.gray900}
        animated
        hidden={false}
        barStyle="dark-content"
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.contentContainer}
      >
        <Header onPress={setSupportModal.bind(this, true)} />
        <View style={styles.content}>
          <Logo width={105} height={50} />
          <View style={styles.inputBox}>
            <View style={styles.inputPack}>
              <View style={styles.textInputBox}>
                <MaterialTextField
                  label="نام کاربری"
                  keyboardType="default"
                  maxLength={30}
                  onChange={clearError}
                  onChangeText={(value: any) => {
                    setUsername(value);
                  }}
                  value={username}
                />
              </View>
              <View style={[styles.textInputBox]}>
                <MaterialTextField
                  label="رمز عبور"
                  keyboardType="default"
                  maxLength={30}
                  icon="password"
                  onChange={clearError}
                  onChangeText={(value: any) => {
                    setPassword(value);
                  }}
                  value={password}
                />
              </View>
              <View style={styles.errorBox}>
                {error.isError && (
                  <View>
                    <FormattedText
                      style={[styles.errorText, { color: theme.warningColor }]}
                    >
                      {error.errorText}
                    </FormattedText>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <LoginBtn
              isFaceId={username || password ? false : isFace}
              isFinger={username || password ? false : isFinger}
              title={
                username || password
                  ? "ورود"
                  : isFace
                  ? `ورود با تشخیص چهره`
                  : isFinger
                  ? "ورود با اثر انگشت"
                  : "ورود"
              }
              color={colors.buttonSubmitActive}
              onPress={() =>
                username || password
                  ? handleTouch(username, password)
                  : isFace
                  ? handleBiometricsAction()
                  : isFinger
                  ? handleBiometricsAction()
                  : handleTouch(username, password)
              }
              disabled={loading}
              loading={loading}
              style={styles.button}
            />
          </View>
        </View>
        <Modal
          isVisible={showBiometricModal}
          onBackdropPress={() => setShowBiometricModal(false)}
          style={styles.modal}
        >
          <View style={styles.modalContainer}>
            <FormattedText style={styles.modalTitle} id="login.fingerprint" />
            <View style={styles.modalIconWrapper}>
              <Fingerprint
                width={55}
                height={70}
                fill={theme.svg.fingerprint}
              />
            </View>
            <FormattedText
              style={styles.modalDescription}
              id="login.fingerproint-quesion"
            />
            <Button
              title="بله"
              onPress={handleSetBiometricsLogin}
              color={colors.links}
              outline
              style={styles.modalCancelButton}
            />
          </View>
        </Modal>

        <SupportController
          showModal={supportModal}
          setShowModal={setSupportModal.bind(this, false)}
          title="پشتیبانی‌"
          phoneNumber="02147474747"
        />
        <View style={styles.noRegister}>
          {isChild && !!childPhoneNum && (
            <View>
              <FanButton navigation={navigation} />
            </View>
          )}
          {!isChild && (
            <FormattedText style={styles.registerText}>
              قبلا ثبت‌نام نکرده‌اید؟
            </FormattedText>
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default withTheme(Login);
