import React, { useState, useEffect } from "react";
import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FormattedText } from "components/format-text";
import * as Keychain from "react-native-keychain";
import style from "./style";
import Button from "components/button";
import { useSelector } from "react-redux";
import MaterialTextField from "components/materialTextfield";
import ActionModalButtom from "components/modal/actionModalBottom";
import ValidatePassword from "components/validatePassword";
import { handleUsernameValidator, checkHasNumber } from "utils/validators";
import SupportController from "components/supportController";
import Switch from "components/switch";
import EditIcon from "components/icons/editIcon.svg";
import GalleryIcon from "components/icons/gallery.svg";
import CameraIcon from "components/icons/camera.svg";
import TrashIcon from "components/icons/trash.svg";
import AddImageIcon from "components/icons/addImage.svg";
import Card from "pages/setting/components/card";
import KeyValuePair from "pages/setting/components/keyValuePair";
import { setSettingData, setFatherChangePassword } from "utils/api";
import SigninModal from "components/signinModal";
import { getLocalData, removeLocalData } from "utils/localStorage";
import { RootState } from "../../../customType";
import {
  ModalType,
  handleCamera,
  handleImagePicker,
  OFFLOAD_MODAL,
} from "./constants";
import { withTheme } from "themeCore/themeProvider";

const FatherSetting = ({ fatherData, handleUpdateData, theme }: any) => {
  const navigation = useNavigation();
  const token = useSelector<RootState, any>((state) => state.user.token);
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(fatherData.username || "");
  const [newPassword, setNewPassword] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>(fatherData.nickname || "");
  const [avatar, setAvatar] = useState<string>(fatherData.avatar || "");
  const [modal, setModal] = useState<ModalType>(OFFLOAD_MODAL);
  const [error, setError] = useState<any>({ field: "", message: "" });
  const [supportModal, setSupportModal] = useState<boolean>(false);
  const [showSigninModal, setShowSigninModal] = useState<boolean>(false);
  const [updatedData, setUpdatedData] = useState<any>(null);
  const [definedBiometrics, setDefinedBiometrics] = useState<boolean>(false);
  const [
    biometricType,
    setBiometricType,
  ] = useState<Keychain.BIOMETRY_TYPE | null>(null);

  useEffect(() => {
    clearError();
  }, [modal]);

  useEffect(() => {
    handleBiometricTypeCheck();
  }, []);

  const isFinger =
    biometricType === "TouchID" || biometricType === "Fingerprint";
  const isFace = biometricType === "FaceID";

  const handleBiometricTypeCheck = async () => {
    const biometricsType = await Keychain.getSupportedBiometryType();
    setBiometricType(biometricsType);
    const checkWasAssigned = await getLocalData("biometrics");
    if (checkWasAssigned === "true") {
      setDefinedBiometrics(true);
    } else {
      setDefinedBiometrics(false);
    }
  };

  const handleSwitchBiometrics = async (value: boolean) => {
    if (!value) {
      await Keychain.resetGenericPassword({ service: "MoneyApp" });
      removeLocalData("biometrics");
    } else if (value && definedBiometrics) {
      // setShowSigninModal(true);
    }
  };

  const handleValidatePassword = (status: boolean) => {
    setPasswordIsValid(status);
  };

  const handleSetSettingData = async (newAvatar: string | null = null) => {
    setLoading(true);
    let requestBody = null;
    switch (modal.activeContent) {
      case "USERNAME":
        requestBody = { username };
        break;
      case "PASSWORD":
        requestBody = { currentPassword, newPassword };
        break;
      case "NICKNAME":
        requestBody = { nickname };
        break;
      case "AVATAR": // for Deletion of the avatar
        requestBody = { avatar: "" };
        break;
      default:
        requestBody = null;
    }
    try {
      if (newAvatar) requestBody = { avatar: newAvatar };
      if (modal.activeContent === "PASSWORD") {
        const { status, data } = await setFatherChangePassword(
          token,
          requestBody
        );
        if (status === 200) {
          handleUpdateData(data);
          if (modal.activeContent === "PASSWORD") {
            await Keychain.resetGenericPassword();
          }
        }
      } else {
        const { status, data } = await setSettingData(token, requestBody);
        if (status === 200) {
          handleUpdateData(data);
        }
      }
    } catch (err) {
      if (
        modal.activeContent === "USERNAME" ||
        modal.activeContent === "PASSWORD"
      ) {
        await Keychain.resetGenericPassword({ service: "MoneyApp" });
        setShowSigninModal(true);
      }
      console.warn("ERROR ON UPDATING FATHER DATA: ", err.response);
    } finally {
      setLoading(false);
      setModal(OFFLOAD_MODAL);
    }
  };

  const renderModalContent = () => {
    switch (modal.activeContent) {
      case "USERNAME":
        return renderUserNameEdit();
      case "PASSWORD":
        return renderPasswordEdit();
      case "NICKNAME":
        return renderNicknameEdit();
      case "AVATAR":
        return renderAvatarEdit();
      default:
        return null;
    }
  };

  const clearError = () => {
    setError({
      field: "",
      message: "",
    });
  };

  const renderUserNameEdit = () => (
    <>
      <FormattedText style={style.modalDescription}>
        لطفا نام کاربری جدید را وارد نمائید.
      </FormattedText>
      <MaterialTextField
        label="نام کاربری جدید"
        title="نام کاربری باید با حروف انگلیسی باشد و با عدد شروع نشود."
        onChange={clearError}
        style={{ fontFamily: "IRANSansMobile" }}
        onChangeText={(value: any) => {
          setUsername(value);
          handleUsernameValidator(value, setError);
        }}
        value={username}
        error={error.field === "username" ? error.message : null}
      />
    </>
  );

  const renderPasswordEdit = () => (
    <>
      <MaterialTextField
        label="رمز عبور فعلی"
        icon="password"
        onChange={clearError}
        onChangeText={(value: any) => {
          setCurrentPassword(value);
        }}
        error={error.field === "password" ? error.message : null}
      />
      <MaterialTextField
        label="رمز عبور دلخواه"
        icon="password"
        onChange={clearError}
        onChangeText={(value: any) => {
          setNewPassword(value);
        }}
      />
      <ValidatePassword
        password={newPassword}
        handleValidatePassword={handleValidatePassword}
        customStyle={style.validatePassword}
      />
    </>
  );

  const renderNicknameEdit = () => (
    <>
      <FormattedText style={style.modalDescription}>
        لطفا نامی‌ که می‌خواهید فرزندتان در برنامه ببیند را وارد نمائید.
      </FormattedText>
      <MaterialTextField
        label="نام"
        onChange={clearError}
        onChangeText={(value: any) => {
          setNickname(value);
        }}
        value={nickname}
        error={error.field === "nickname" ? error.message : null}
      />
    </>
  );

  const renderAvatarEdit = () => (
    <View>
      <View style={style.imageUploadWrapper}>
        <TouchableOpacity
          onPress={() => handleCamera(setAvatar, handleSetSettingData)}
        >
          <CameraIcon />
          <FormattedText style={style.uploadTitle}>دوربین</FormattedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleImagePicker(setAvatar, handleSetSettingData)}
        >
          <GalleryIcon />
          <FormattedText style={style.uploadTitle}>آلبوم</FormattedText>
        </TouchableOpacity>
        {!!fatherData?.avatar && fatherData?.avatar.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setAvatar("");
              handleSetSettingData();
            }}
          >
            <TrashIcon />
            <FormattedText style={style.uploadTitle}>حذف</FormattedText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={style.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={style.head}>
          <View style={style.avatarWrapper}>
            <TouchableOpacity
              onPress={() =>
                setModal({
                  title: "ویرایش تصویر پروفایل ",
                  activeContent: "AVATAR",
                  visibility: true,
                })
              }
            >
              {avatar.length === 0 ? (
                <View style={style.avatar}>
                  <AddImageIcon />
                </View>
              ) : (
                <Image
                  style={style.avatar}
                  source={{
                    uri: `data:image/png;base64, ${fatherData.avatar}`,
                  }}
                />
              )}
              <View style={style.edit}>
                <EditIcon
                  fill={theme.setting.editIconColor}
                  width={12}
                  height={12}
                />
              </View>
            </TouchableOpacity>
          </View>
          <FormattedText style={style.name}>
            {fatherData.firstname + " " + fatherData.lastname}
          </FormattedText>
          <KeyValuePair rowKey="تاریخ تولد:" value={fatherData.birthday} />
          <KeyValuePair rowKey="شماره تماس:" value={fatherData.mobile} />
          <KeyValuePair rowKey="آدرس:" value={fatherData.address} />
        </View>

        <View style={style.callInformation}>
          <FormattedText style={style.callText} fontFamily="Regular-FaNum">
            <Text>در صورت تمایل به تغییر اطلاعات حساب خود با شماره </Text>
            <Text
              style={style.bluePhoneNumber}
              onPress={() => setSupportModal(true)}
            >
              02112345678
            </Text>
            <Text> تماس حاصل نمائید.</Text>
          </FormattedText>
        </View>

        <View style={style.cardsWrapper}>
          {biometricType && (
            <Card title="امنیت">
              <>
                <View style={style.cardRow}>
                  <FormattedText style={style.biometricsSwitchLabel}>
                    {isFinger
                      ? "ورود با اثر انگشت"
                      : isFace
                      ? "ورود با تشخیص چهره"
                      : ""}
                  </FormattedText>
                  <Switch
                    isActive={definedBiometrics}
                    activeColor={theme.ButtonBlueColor}
                    onChange={handleSwitchBiometrics}
                  />
                </View>
                {/* <View style={style.cardRow}>
                <KeyValuePair
                  rowKey="نام کاربری:"
                  value={fatherData.username}
                  enNum
                />
                <TouchableOpacity
                  onPress={() =>
                    setModal({
                      title: "ویرایش نام کاربری",
                      activeContent: "USERNAME",
                      visibility: true,
                    })
                  }
                  style={style.editIconWrapper}
                >
                  <EditIcon
                    fill={theme.setting.editIconColor}
                    width={20}
                    height={20}
                  />
                </TouchableOpacity>
              </View> */}
                {/* <View style={style.cardRow}>
                <KeyValuePair rowKey="رمز ورود:" value="********" />
                <TouchableOpacity
                  onPress={() =>
                    setModal({
                      title: "ویرایش رمز عبور",
                      activeContent: "PASSWORD",
                      visibility: true,
                    })
                  }
                  style={style.editIconWrapper}
                >
                  <EditIcon
                    fill={theme.setting.editIconColor}
                    width={16}
                    height={16}
                  />
                </TouchableOpacity>
              </View> */}
              </>
            </Card>
          )}
          <Card title="تنظیمات">
            <>
              <View style={style.cardRow}>
                <KeyValuePair
                  rowKey="نام شما در برنامه:"
                  value={fatherData.nickname}
                />
                <TouchableOpacity
                  onPress={() =>
                    setModal({
                      title: "ویرایش نام شما در برنامه",
                      activeContent: "NICKNAME",
                      visibility: true,
                    })
                  }
                  style={style.editIconWrapper}
                >
                  <EditIcon
                    fill={theme.setting.editIconColor}
                    width={16}
                    height={16}
                  />
                </TouchableOpacity>
              </View>
              <FormattedText style={style.cardRowDescription}>
                فرزند شما در برنامه مانی شما را با این نام خواهد دید.
              </FormattedText>
            </>
          </Card>
        </View>
      </ScrollView>

      <ActionModalButtom
        showModal={modal.visibility}
        setShowModal={() => setModal({ ...modal, visibility: false })}
        title={modal.title}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={style.modalContent}
        >
          {renderModalContent()}
          {modal.activeContent !== "AVATAR" && (
            <Button
              title="ذخیره"
              onPress={() => handleSetSettingData()}
              color={theme.ButtonGreenColor}
              loading={loading}
              disabled={
                loading
                  ? loading
                  : modal.activeContent === "PASSWORD"
                  ? !passwordIsValid
                  : modal.activeContent === "USERNAME"
                  ? checkHasNumber(username ? username[0] : "")
                  : false
              }
            />
          )}
        </ScrollView>
      </ActionModalButtom>

      <SupportController
        showModal={supportModal}
        setShowModal={() => setSupportModal(false)}
        title="پشتیبانی‌"
        phoneNumber="02147474747"
      />

      <SigninModal
        showModal={showSigninModal}
        setShowModal={setShowSigninModal}
        handleSignIn={() => handleUpdateData(updatedData)}
        handleCancel={() => {
          setShowSigninModal(false);
          navigation.reset({
            index: 0,
            routes: [{ name: "auth" }],
          });
        }}
        beginWithBiometrics={false}
      />
    </View>
  );
};

export default withTheme(FatherSetting);
