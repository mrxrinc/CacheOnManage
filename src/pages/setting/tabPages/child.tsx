import React, { useState, useEffect } from "react";
import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { FormattedText } from "components/format-text";
import { colors } from "constants/index";
import style from "./style";
import Button from "components/button";
import * as Keychain from "react-native-keychain";
import { RootState } from "../../../../customType";
import { useDispatch, useSelector } from "react-redux";
import MaterialTextField from "components/materialTextfield";
import ActionModalButtom from "components/modal/actionModalBottom";
import EditIcon from "components/icons/edit.svg";
import Card from "pages/setting/components/card";
import KeyValuePair from "pages/setting/components/keyValuePair";
import { setChildrenSettingData } from "utils/api";
import ValidatePassword from "components/validatePassword";
import { handleUsernameValidator, checkHasNumber } from "utils/validators";
import SupportController from "components/supportController";
import GalleryIcon from "components/icons/gallery.svg";
import CameraIcon from "components/icons/camera.svg";
import TrashIcon from "components/icons/trash.svg";
import AddImageIcon from "components/icons/addImage.svg";
import UnequalTwinButtons from "components/unequalTwinButtons";
import {
  ModalType,
  handleCamera,
  handleImagePicker,
  OFFLOAD_MODAL,
} from "./constants";

export default ({ childData, handleUpdateData }: any) => {
  const token = useSelector<RootState, any>((state) => state.user.token);
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(childData.username || "");
  const [mobile, setMobile] = useState<string>(childData.mobile || "");
  const [nickname, setNickname] = useState<string>(childData.nickname || "");
  const [newPassword, setNewPassword] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
  const [supportModal, setSupportModal] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>(childData.avatar || "");
  const [modal, setModal] = useState<ModalType>(OFFLOAD_MODAL);
  const [error, setError] = useState<any>({ field: "", message: "" });

  useEffect(() => {
    clearError();
  }, [modal]);

  const handleValidatePassword = (status: boolean) => {
    setPasswordIsValid(status);
  };

  const clearError = () => {
    setError({
      field: "",
      message: "",
    });
  };

  const handleSetSettingData = async (newAvatar: string | null = null) => {
    setLoading(true);
    let requestBody = {};
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
      case "MOBILE":
        requestBody = { mobile };
        break;
      case "AVATAR": // for Deletion of the avatar
        requestBody = { avatar: "" };
        break;
      default:
        requestBody = {};
    }

    requestBody = {
      ...requestBody,
      id: childData.id,
    };

    try {
      if (newAvatar) requestBody = { avatar: newAvatar, id: childData.id };
      const { status, data } = await setChildrenSettingData(token, requestBody);
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
    } catch (err) {
      setLoading(false);
      console.warn("ERROR ON UPDATING CHILD DATA: ", err.response);
    }
  };

  const renderModalContent = () => {
    switch (modal.activeContent) {
      case "USERNAME":
        return renderUserNameEdit();
      case "PASSWORD":
        return renderPasswordEdit();
      case "MOBILE":
        return renderMobileEdit();
      case "NICKNAME":
        return renderNicknameEdit();
      case "AVATAR":
        return renderAvatarEdit();
      default:
        return null;
    }
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
        icon="password"
        label="رمز عبور دلخواه"
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

  const renderMobileEdit = () => (
    <>
      <MaterialTextField
        label="شماره تلفن همراه"
        onChange={clearError}
        onChangeText={(value: any) => {
          setMobile(value);
        }}
        maxLength={11}
        keyboardType="number-pad"
        value={mobile}
        error={
          error.field === "mobile"
            ? error.message
            : mobile === ""
            ? "شماره همراه نمیتواند خالی باشد."
            : null
        }
      />
    </>
  );

  const renderNicknameEdit = () => (
    <>
      <MaterialTextField
        label="نام مستعار"
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
        {!!childData?.avatar && childData?.avatar.length > 0 && (
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
                  source={{ uri: `data:image/png;base64, ${childData.avatar}` }}
                />
              )}
              <View style={style.edit}>
                <EditIcon width={14} height={14} />
              </View>
            </TouchableOpacity>
          </View>
          <FormattedText style={style.name}>
            {childData.firstname + " " + childData.lastname}
          </FormattedText>
          <KeyValuePair rowKey="تاریخ تولد:" value={childData.birthday} />
          <KeyValuePair
            rowKey="جنسیت:"
            value={childData.gender === "FEMALE" ? "زن" : "مرد"}
          />
          <View style={style.mobileRow}>
            <KeyValuePair rowKey="شماره موبایل:" value={childData.mobile} />
            <TouchableOpacity
              onPress={() =>
                setModal({
                  title: "ویرایش تلفن همراه",
                  activeContent: "MOBILE",
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
                  value={childData.username}
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
                  rowKey="نام مستعار:"
                  value={childData.nickname ?? "نام مستعاری ثبت نشده"}
                />
                <TouchableOpacity
                  onPress={() =>
                    setModal({
                      title: "ویرایش نام مستعار",
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
                فرزند شما در مانی با این نام شناخته خواهد شد.
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
                    : mobile === ""
                    ? true
                    : false
                }
              />
            )}
          {modal.activeContent === "NICKNAME" &&
            (!!childData.nickname && childData.nickname.length !== 0 ? (
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
