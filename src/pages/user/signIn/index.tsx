import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import * as Keychain from "react-native-keychain";
import { FormattedText } from "components/format-text";
import { useNavigation, NavigationProp } from "@react-navigation/core";
import { StackParamList } from "navigation/splash-stack-navigator";
import {
  signUpStepChanged,
  showTreeChanged,
  otpTokenChanged,
} from "redux/actions/User";
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
import { RootState, RootStateType } from "../../../../customType";
import SupportController from "components/supportController";
import { setLocalData, getLocalData } from "utils/localStorage";
import FanBoutton from "./fanBoutton";
import { withTheme } from "../../../themeCore/themeProvider";

type Navigation = NavigationProp<StackParamList>;
interface IError {
  errorText: string;
  isError: boolean;
}

// type BiometricType = "Fingerprint" | "Face" | "TouchID" | "FaceID" | null;

const SignIn = ({ theme }: any) => {
  const navigation = useNavigation<Navigation>();
  const [username, setUsername] = useState("Ali_babaa");
  const [password, setPassword] = useState("Aa123456");
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    handleBiometricTypeCheck();

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
    setBiometricType(biometricsType);
  };

  const handleTouch = async (username: string, password: string) => {
    setLoading(true);
    if (validateUserName(username)) {
      login(username, password, isChild)
        .then((response: any) => {
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
                  navigation.reset({ index: 0, routes: [{ name: "main" }] });
                  setUsername("");
                  setPassword("");
                }
              })();
            } else {
              navigation.reset({ index: 0, routes: [{ name: "main" }] });
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
        navigation.reset({ index: 0, routes: [{ name: "main" }] });
      }, 500);
    } catch (error) {
      console.warn("ERROR ON SETTING BIOMETCIS ", error);
    }
  };

  const handleBiometricsAction = async () => {
    try {
      // Retrieve the credentials
      const options = {
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
      setError({
        errorText: "شناسایی اثر انگشت با مشکل روبرو شد",
        isError: true,
      });
    }
  };

  return (
    <View
      style={[
        styles.inputContainer,
        { backgroundColor: theme.backgroundColor },
      ]}
    >
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
              secureTextEntry={true}
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
        {(biometricType === "TouchID" || biometricType === "Fingerprint") && (
          <View style={styles.fingerBox}>
            <TouchableOpacity onPress={handleBiometricsAction}>
              <Fingerprint
                fill={theme.svg.fingerprint}
                width={55}
                height={70}
              />
            </TouchableOpacity>
            <FormattedText
              style={[styles.modalTitle, { color: theme.text.loginText }]}
              id="login.fingerprint"
            />
          </View>
        )}

        {biometricType === "FaceID" && (
          <View style={styles.fingerBox}>
            <TouchableOpacity onPress={handleBiometricsAction}>
              <FaceIDIcon />
            </TouchableOpacity>
            <FormattedText style={styles.modalTitle} id="login.FaceId" />
          </View>
        )}

        <View style={styles.button}>
          <Button
            title="ورود"
            color={colors.buttonSubmitActive}
            onPress={() => handleTouch(username, password)}
            disabled={(username == "" || password == "" || loading) && true}
            loading={loading}
          />
        </View>

        <View style={styles.noRegister}>
          {isChild && !!childPhoneNum && (
            <View style={{ marginTop: "40%" }}>
              <FanBoutton navigation={navigation} />
            </View>
          )}
        </View>
      </View>

      <View style={{ height: 30 }} />

      <Modal
        isVisible={showBiometricModal}
        onBackdropPress={() => setShowBiometricModal(false)}
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <FormattedText style={styles.modalTitle} id="login.fingerprint" />
          <View style={styles.modalIconWrapper}>
            <Fingerprint />
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
        setShowModal={() => setSupportModal(false)}
        title="پشتیبانی‌"
        phoneNumber="02147474747"
      />
    </View>
  );
};
export default withTheme(SignIn);
