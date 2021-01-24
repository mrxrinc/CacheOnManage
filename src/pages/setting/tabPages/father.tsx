import React, { useState, useEffect } from "react";
import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { FormattedText } from "components/format-text";
import { colors } from "constants/index";
import style from "./style";
import Button from "components/button";
import * as Keychain from "react-native-keychain";
import { useSelector } from "react-redux";
import MaterialTextField from "components/materialTextfield";
import ActionModalButtom from "components/modal/actionModalBottom";
import ValidatePassword from "components/validatePassword";
import { handleUsernameValidator, checkHasNumber } from "utils/validators";
import SupportController from "components/supportController";
import UnequalTwinButtons from "components/unequalTwinButtons";
import EditIcon from "components/icons/edit.svg";
import GalleryIcon from "components/icons/gallery.svg";
import CameraIcon from "components/icons/camera.svg";
import TrashIcon from "components/icons/trash.svg";
import AddImageIcon from "components/icons/addImage.svg";
import Card from "pages/setting/components/card";
import KeyValuePair from "pages/setting/components/keyValuePair";
import { setSettingData, setFatherChangePassword } from "utils/api";
import { RootState } from "../../../customType";
import {
  ModalType,
  handleCamera,
  handleImagePicker,
  OFFLOAD_MODAL,
} from "./constants";

export default ({ fatherData, handleUpdateData }: any) => {
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

  useEffect(() => {
    clearError();
  }, [modal]);

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
        setLoading(false);
        if (status === 200) {
          handleUpdateData(data);
          setModal(OFFLOAD_MODAL);
          if (modal.activeContent === "PASSWORD") {
            await Keychain.resetGenericPassword();
          }
        }
      } else {
        const { status, data } = await setSettingData(token, requestBody);
        setLoading(false);
        if (status === 200) {
          handleUpdateData(data);
          setModal(OFFLOAD_MODAL);
          if (
            modal.activeContent === "USERNAME" ||
            modal.activeContent === "PASSWORD"
          ) {
            await Keychain.resetGenericPassword();
          }
        }
      }
    } catch (err) {
      setLoading(false);
      console.warn("ERROR ON UPDATING FATHER DATA: ", err.response);
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
      <ScrollView>
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
                <EditIcon width={14} height={14} />
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
          <Card title="امنیت">
            <>
              <View style={style.cardRow}>
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
                    width={20}
                    height={20}
                    style={{ color: colors.links }}
                  />
                </TouchableOpacity>
              </View>
              <View style={style.cardRow}>
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
                    width={20}
                    height={20}
                    style={{ color: colors.links }}
                  />
                </TouchableOpacity>
              </View>
            </>
          </Card>
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
                    width={20}
                    height={20}
                    style={{ color: colors.links }}
                  />
                </TouchableOpacity>
              </View>
              <FormattedText style={style.cardRowDescription}>
                فرزند شما در برنامه مانی شمارا با این نام خواهد دید.
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
        <ScrollView contentContainerStyle={style.modalContent}>
          {renderModalContent()}
          {modal.activeContent !== "AVATAR" &&
            modal.activeContent !== "NICKNAME" && (
              <Button
                title="ذخیره"
                onPress={() => handleSetSettingData()}
                color={colors.buttonSubmitActive}
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
          {modal.activeContent === "NICKNAME" &&
            (fatherData.nickname.length !== 0 ? (
              <UnequalTwinButtons
                mainText="ذخیره"
                mainColor={colors.buttonSubmitActive}
                mainOnPress={() => handleSetSettingData()}
                secondaryText="حذف"
                secondaryColor={colors.buttonDestructiveActive}
                secondaryOnPress={() => {
                  setNickname("");
                  handleSetSettingData();
                }}
                style={style.unequalButtonsWrapper}
              />
            ) : (
              <Button
                title="ذخیره"
                onPress={() => handleSetSettingData()}
                color={colors.buttonSubmitActive}
                loading={loading}
                disabled={loading ? loading : false}
              />
            ))}
        </ScrollView>
      </ActionModalButtom>

      <SupportController
        showModal={supportModal}
        setShowModal={() => setSupportModal(false)}
        title="پشتیبانی‌"
        phoneNumber="02147474747"
      />
    </View>
  );
};
