import React, { useState, useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useSelector, useDispatch } from "react-redux";
import * as Keychain from "react-native-keychain";
import { otpTokenChanged } from "redux/actions/User";
import { useNavigation } from "@react-navigation/core";
import {
  childPhoneNumber,
  mobileOperatorName,
} from "store/QuickAccess/quickAccess.actions";
import styles from "./styles";
import { login } from "utils/api";
import { validateUserName } from "utils/validators";
import MaterialTextField from "components/materialTextfield";
import { RootState, RootStateType } from "../../../../../customType";
import SupportController from "components/supportController";
import { setLocalData, getLocalData } from "utils/localStorage";
import { withTheme } from "themeCore/themeProvider";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Logo from "images/blu-logo.svg";
import WhiteLogo from "images/white-logo.svg";
import Header from "./header";
import FooterLogin from "./FooterLogin";
import StatusLogin from "./StatusLogin";
import FingerModal from "./FingerModal";
import ButtonLogin from "./ButtonLogin";
import ErrorLogin from "./ErrorLogin";

interface IError {
  errorText: string;
  isError: boolean;
}

const Login = ({ theme }: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showBiometricModal, setShowBiometricModal] = useState<boolean>(false);
  const [
    biometricType,
    setBiometricType,
  ] = useState<Keychain.BIOMETRY_TYPE | null>(null);
  const [error, setError] = useState<IError>({
    errorText: "",
    isError: false,
  });
  const [supportModal, setSupportModal] = useState<boolean>(false);

  const isChild = useSelector<RootState, any>((state) => state.user.ischild);
  const childPhoneNum = useSelector<RootStateType, any>(
    (state) => state.quickAccess.childPhone || ""
  );

  const isFinger =
    biometricType === "TouchID" || biometricType === "Fingerprint";
  const isFace = biometricType === "FaceID";
  const bljTheme = theme.key === "FATHER BLU JUNIOR" ? true : false;

  useEffect(() => {
    setData();
    handleBiometricTypeCheck();
    setOperator();
  }, []);

  const clearError = () => {
    setError({
      errorText: "",
      isError: false,
    });
  };

  const handleBiometricTypeCheck = async () => {
    const biometricsType = await Keychain.getSupportedBiometryType();
    const checkWasAssigened = await getLocalData("biometrics");
    setBiometricType(biometricsType);
    if (checkWasAssigened) {
      handleBiometricsAction(true);
    }
  };

  const setOperator = () => {
    if (childPhoneNum.match(/^093/i) || childPhoneNum.match(/^090/i)) {
      dispatch(mobileOperatorName("IRANCELL"));
    } else if (childPhoneNum.match(/^091/i)) {
      dispatch(mobileOperatorName("MCI"));
    } else {
      dispatch(mobileOperatorName("RIGHTEL"));
    }
  };

  const setData = async () => {
    const user: any = await AsyncStorage.getItem("username");
    console.log(user);
    setUsername(user);
    AsyncStorage.getItem("childPhone").then((childPhone) => {
      dispatch(childPhoneNumber(childPhone));
    });
  };

  const handleTouch = async (username: string, password: string) => {
    console.log(username);
    console.log(password);
    setLoading(true);
    if (validateUserName(username)) {
      login(username, password, isChild)
        .then((response: any) => {
          console.log(response);
          setLoading(false);
          if (response.status == 200) {
            dispatch(otpTokenChanged(response.data.access_token));
            AsyncStorage.setItem("token", response.data.access_token);
            AsyncStorage.setItem("username", username);
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
      });
      await setLocalData("biometrics", "true");
      setUsername("");
      setPassword("");
      navigation.navigate("app");
    } catch (error) {
      return false;
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
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <StatusLogin theme={theme} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.contentContainer}
      >
        <Header theme={theme} onPress={() => setSupportModal(true)} />
        <View style={styles.content}>
          {bljTheme ? (
            <WhiteLogo width={105} height={50} />
          ) : (
            <Logo width={105} height={50} />
          )}
          <View style={styles.inputPack}>
            <MaterialTextField
              label="نام کاربری"
              keyboardType="default"
              maxLength={30}
              onChange={clearError}
              onChangeText={setUsername}
              value={username}
              initValue={username}
            />
            <MaterialTextField
              label="رمز عبور"
              keyboardType="default"
              maxLength={30}
              icon="password"
              onChange={clearError}
              onChangeText={setPassword}
              value={password}
            />
            <ErrorLogin theme={theme} error={error} />
          </View>
          <ButtonLogin
            username={username}
            password={password}
            onPress={() =>
              password
                ? handleTouch(username, password)
                : isFace || isFinger
                ? handleBiometricsAction()
                : handleTouch(username, password)
            }
            loading={loading}
            isFace={isFace}
            isFinger={isFinger}
            theme={theme}
          />
        </View>
        <FooterLogin
          isChild={isChild}
          childPhoneNum={childPhoneNum}
          navigation={navigation}
          bljTheme={bljTheme}
          theme={theme}
        />
      </KeyboardAwareScrollView>
      <SupportController
        showModal={supportModal}
        setShowModal={() => setSupportModal(false)}
        title="پشتیبانی‌"
        phoneNumber="02147474747"
      />
      <FingerModal
        showBiometricModal={showBiometricModal}
        theme={theme}
        handleSetBiometricsLogin={handleSetBiometricsLogin}
        deactive={() => setShowBiometricModal(false)}
      />
    </SafeAreaView>
  );
};
export default withTheme(Login);
