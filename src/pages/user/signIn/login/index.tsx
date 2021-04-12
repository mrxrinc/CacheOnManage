import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text } from "react-native";
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
import Logo from "components/icons/appIcon.svg";
import WhiteLogo from "components/icons/cacheonmanageLogo.svg";
import Header from "./header";
import FooterLogin from "./FooterLogin";
import StatusLogin from "./StatusLogin";
import BioModal from "./BioModal";
import ButtonLogin from "./ButtonLogin";
import LoginInput from "./LoginInput";

interface IError {
  errorText: string;
  isError: boolean;
}

const Login = ({ theme }: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
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
    if (checkWasAssigened && !isChild) {
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
    const parentUsername: any = await AsyncStorage.getItem("parentUsername");
    const childUsername: any = await AsyncStorage.getItem("childUsername");
    let user = isChild ? childUsername ?? "" : parentUsername ?? "";
    setUsername(user);
    const childPhone = await AsyncStorage.getItem("childPhone");
    dispatch(childPhoneNumber(childPhone));
  };

  const handleTouch = async (
    username: string,
    password: string,
    denyBiometric: boolean
  ) => {
    setLoading(true);
    if (validateUserName(username)) {
      login(username, password, isChild)
        .then((response: any) => {
          setLoading(false);
          if (response.status == 200) {
            console.log(response);
            dispatch(otpTokenChanged(response.data.access_token));
            AsyncStorage.setItem("token", response.data.access_token);
            isChild
              ? AsyncStorage.setItem("childUsername", username)
              : AsyncStorage.setItem("parentUsername", username);
            if (biometricType && !denyBiometric) {
              (async () => {
                const checkWasAssigened = await getLocalData("biometrics");
                if (!checkWasAssigened) {
                  setShowBiometricModal(true);
                } else {
                  setUsername("");
                  setPassword("");
                  if (response.data.firstLogin) {
                    navigation.reset({
                      index: 0,
                      routes: [
                        {
                          name: "fetchData",
                          params: { token: response.data.access_token },
                        },
                      ],
                    });
                  } else {
                    navigation.navigate("app");
                  }
                }
              })();
            } else {
              setUsername("");
              setPassword("");
              if (response.data.firstLogin) {
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: "fetchData",
                      params: { token: response.data.access_token },
                    },
                  ],
                });
              } else {
                navigation.navigate("app");
              }
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
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
        accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
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
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
        authenticationPrompt: {
          title: "ورود با اثر انگشت",
          description: "لطفا انگشت خود را بر روی حسگر گوشی قرار دهید",
          cancel: "انصراف",
        },
      };
      const credentials = await Keychain.getGenericPassword(options);
      if (credentials) {
        setUsername(credentials.username);
        handleTouch(credentials.username, credentials.password, false);
      } else {
        setError({
          errorText: isFace
            ? "چهره شما ثبت نشده است"
            : "اثر انگشت شما ثبت نشده است",
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

  const handleLogin = () => {
    password
      ? handleTouch(username, password, false)
      : isFace || isFinger
      ? handleBiometricsAction()
      : handleTouch(username, password, false);
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
          <View style={styles.logo}>
            {bljTheme ? (
              <WhiteLogo width={105} height={50} />
            ) : (
              <Logo width={105} height={50} />
            )}
          </View>
          <LoginInput
            clearError={clearError}
            setUsername={setUsername}
            username={username}
            setPassword={setPassword}
            password={password}
            isError={error.isError}
            errorMsg={error.errorText}
            isChild={isChild}
          />
          <ButtonLogin
            username={username}
            password={password}
            onPress={handleLogin}
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
        phoneNumber="02187641"
      />
      <BioModal
        showBiometricModal={showBiometricModal}
        handleSetBiometricsLogin={handleSetBiometricsLogin}
        deactive={() => {
          handleTouch(username, password, true);
          setShowBiometricModal(false);
        }}
        isFace={isFace}
      />
    </SafeAreaView>
  );
};
export default withTheme(Login);
