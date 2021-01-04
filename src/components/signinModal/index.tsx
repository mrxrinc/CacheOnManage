import React, { FC, useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-native-modal";
import * as Keychain from "react-native-keychain";
import { FormattedText } from "components/format-text";
import MaterialTextField from "components/materialTextfield";
import UnequalTwinButtons from "components/unequalTwinButtons";
import { validateUserName } from "utils/validators";
import { login } from "utils/api";
import { RootState } from "../../../customType";
import { childPhoneNumber } from "store/MobileTopUp/mobileTopUp.actions";
import { colors } from "constants/index";
import styles from "./styles";
import { otpTokenChanged } from "redux/actions/User";

type Props = {
  showModal: boolean;
  setShowModal: (status: boolean) => void;
  handleSignIn: (token: string) => void;
};
type Error = {
  errorText: string;
  isError: boolean;
};

const SigninModal: FC<Props> = ({ showModal, setShowModal, handleSignIn }) => {
  const [
    biometricType,
    setBiometricType,
  ] = useState<Keychain.BIOMETRY_TYPE | null>(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const isChild = useSelector<RootState, any>((state) => state.user.ischild);

  const [error, setError] = useState<Error>({
    errorText: "",
    isError: false,
  });

  const clearError = () => {
    setError({
      field: "",
      message: "",
    });
  };

  const dispatch = useDispatch();
  AsyncStorage.getItem("childPhone").then((childPhone) => {
    dispatch(childPhoneNumber(childPhone));
  });

  useEffect(() => {
    if (showModal === true) handleBiometricTypeCheck();
  }, [showModal]);

  const handleBiometricTypeCheck = async () => {
    const biometricsType = await Keychain.getSupportedBiometryType();
    if (biometricsType) {
      handleBiometricsAction();
    } else {
      setShowSignInModal(true);
    }
    console.debug("SUPPORTED BIOMETRIC TYPE: ", biometricsType);
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
        handleSubmitSignin(credentials.username, credentials.password);
      } else {
        console.warn("No credentials stored");
        setError({
          errorText: "اثر انگشت شما ثبت نشده است",
          isError: true,
        });
      }
    } catch (error) {
      setShowSignInModal(true);
      setError({
        errorText: "شناسایی اثر انگشت با مشکل روبرو شد",
        isError: true,
      });
    }
  };

  const handleSubmitSignin = async (username: string, password: string) => {
    setLoading(true);
    if (validateUserName(username)) {
      login(username, password, isChild)
        .then((response: any) => {
          setLoading(false);
          if (response.status == 200) {
            dispatch(otpTokenChanged(response.data.access_token));
            AsyncStorage.setItem("token", response.data.access_token);
            handleSignIn(response.data.access_token);
            setShowSignInModal(false);
          } else {
            setError({
              errorText: "نام کاربری یا کلمه عبور اشتباه است",
              isError: true,
            });
          }
        })
        .catch((err) => {
          console.warn("SIGNIN ERROR: ", err.response);
          setLoading(false);
          setError({ errorText: err.response.data.message, isError: true });
        });
    } else {
      setLoading(false);
      setError({ errorText: "نام کاربری باید لاتین باشد", isError: true });
    }
  };

  return (
    <Modal
      isVisible={showSignInModal}
      onBackdropPress={() => setShowSignInModal(false)}
      style={styles.modal}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <FormattedText style={styles.title}>ورود</FormattedText>
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
              style={{ fontFamily: "IRANSansMobile" }}
              value={username}
              //   error={}
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
              style={{ fontFamily: "IRANSansMobile" }}
              value={password}
              //   error={}
            />
          </View>
          <View style={styles.errorBox}>
            {error.isError && (
              <View>
                <FormattedText style={styles.errorText}>
                  {error.errorText}
                </FormattedText>
              </View>
            )}
          </View>
        </View>
        <UnequalTwinButtons
          buttonType="equal"
          mainText="ورود"
          mainColor={colors.buttonSubmitActive}
          mainOnPress={() => handleSubmitSignin(username, password)}
          secondaryText="انصراف"
          secondaryColor={colors.blue}
          secondaryOnPress={() => {
            setShowSignInModal(false);
            setShowModal(false);
          }}
          style={styles.buttonsWrapper}
        />
      </ScrollView>
    </Modal>
  );
};

export default SigninModal;
