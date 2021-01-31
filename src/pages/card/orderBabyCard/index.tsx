import React, { useState, useRef } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { FormattedText } from "components/format-text";
import Card from "images/cards/orderBabyCard/deactive.svg";
import Plus from "images/cards/orderBabyCard/plus.svg";
import Success from "images/cards/orderBabyCard/success.svg";
import Button from "components/button";
import { colors } from "constants/index";
import ActionModalButtom from "components/modal/actionModalBottom";
import UnequalTwinButtons from "components/unequalTwinButtons";
import { ModalType, OFFLOAD_MODAL } from "../constants";
import { setOrderCard, setCardActive, addressInqury } from "utils/api";
import styles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { RootState, RootStateType } from "../../../../customType";
import MaterialTextField from "components/materialTextfield";
import Input from "components/input";
import CardsActions from "store/Cards/cards.action";
const { width, height } = Dimensions.get("window");

interface IResponse {
  description: String;
  isSuccess: any;
}
const OrderBabyCard = (props: any) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState<ModalType>(OFFLOAD_MODAL);
  const cardInfo = props.cardsInfo;
  const token = useSelector<RootStateType, any>((state) => state.user.token);
  const isChild = useSelector<RootState, any>((state) => state.user.ischild);
  const [response, setResponse] = useState<IResponse>({
    description: "",
    isSuccess: null,
  });
  const [cardPan, setCardPan] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState(cardInfo.postalCode);
  const [edit, setEdit] = useState<Boolean>(false);
  const [mainLoading, setMainLoading] = useState<Boolean>(false);

  const inputRef = useRef(null);

  console.log("cardInfo is", cardInfo);

  const handleOrderCard = () => {
    setMainLoading(true);
    const data = {
      childId: cardInfo.childId,
      postalCode: postalCode,
    };
    setOrderCard(token, data)
      .then((response) => {
        setMainLoading(false);
        setResponse({
          description: response.data.success,
          isSuccess: true,
        });
        dispatch(CardsActions.callCardInfo("orderCard"));
      })
      .catch((err) => {
        setMainLoading(false);
        setResponse({
          description: err.response.data.message,
          isSuccess: false,
        });
      });
  };

  const handleTouch = () => {
    if (cardInfo.status == "NONE") {
      setModal({
        title: response.isSuccess == null ? "سفارش کارت" : "",
        activeContent: "ORDER",
        visibility: true,
      });
    } else {
      //  set activation
      setModal({
        title: response.isSuccess == null ? "فعالسازی کارت" : "",
        activeContent: "ACTIVATION",
        visibility: true,
      });
    }
  };

  const handleActivation = () => {
    const data = {
      childId: cardInfo.childId,
      pan: cardPan,
      pin: password,
    };
    logger("handleActivation response", data);
    setCardActive(token, data)
      .then((response) => {
        logger("handleActivation response", response);
        setResponse({
          description: response.data.success,
          isSuccess: true,
        });
        dispatch(CardsActions.callCardInfo("activationCard"));
      })
      .catch((err) => {
        logger("handleActivation err1", err);
        setResponse({
          description: err.response.data.message,
          isSuccess: false,
        });
      });
  };

  const handleAddressCheck = (postalCode: string) => {
    console.log("handleAddressCheck postal code ", postalCode);
    setMainLoading(true);
    setPostalCode(postalCode);
    if (inputRef) inputRef.current.blur();
    addressInqury(token, postalCode)
      .then((response) => {
        console.log("handleAddressCheck response", response);
        setMainLoading(false);
        setAddress(response.data.address);
      })
      .catch((err) => {
        console.log("handleAddressCheck err1", err);
        console.log("handleAddressCheck err", err.response);
        setMainLoading(false);
        setResponse({
          description: err.response.data.message,
          isSuccess: false,
        });
      });
  };

  const renderOrderCard = () => {
    return (
      <View>
        {response.isSuccess == null ? (
          <View>
            <View style={styles.modalBodyContainer}>
              <View style={styles.addressTitle}>
                {edit ? (
                  <FormattedText style={styles.editAddressTitleText}>
                    لطفا کد پستی آدرسی که می‌خواهید کارت به آن ارسال شود را وارد
                    نمائید.
                  </FormattedText>
                ) : (
                  <FormattedText style={styles.addressTitleText}>
                    کارت به آدرس زیر ارسال میشود:
                  </FormattedText>
                )}
              </View>
              {edit && (
                <>
                  <View style={{ width: "89%" }}>
                    <MaterialTextField
                      label="کد پستی"
                      style={{ fontFamily: "IRANSansMobileFaNum" }}
                      maxLength={10}
                      keyboardType="number-pad"
                      ref={inputRef}
                      autoFocus
                      onChangeText={(value: string) => {
                        if (value.length === 10) handleAddressCheck(value);
                      }}
                      // onChange={clearError}
                      // error={error.field === "postalCode" ? error.message : null}
                    />
                  </View>
                  {!mainLoading && !!address && (
                    <>
                      <View style={styles.address}>
                        <FormattedText style={{ fontSize: 12 }}>
                          آدرس
                        </FormattedText>
                        <FormattedText
                          style={{ fontSize: 14, color: colors.text }}
                        >
                          {address}
                        </FormattedText>
                      </View>
                      <View style={styles.editButtonWrapper}>
                        <Button
                          title="تائید آدرس و سفارش "
                          color={colors.buttonSubmitActive}
                          onPress={handleOrderCard}
                        />
                      </View>
                    </>
                  )}
                  {mainLoading && (
                    <View style={styles.loadingWrapper}>
                      <ActivityIndicator color={colors.gray700} size="large" />
                    </View>
                  )}
                </>
              )}
            </View>
            {!edit && (
              <>
                <View style={styles.address}>
                  <FormattedText
                    style={{ fontSize: 14, color: colors.text, lineHeight: 21 }}
                  >
                    {cardInfo.address}
                  </FormattedText>
                </View>
                <UnequalTwinButtons
                  buttonType={"equal"}
                  mainText="تائید آدرس و سفارش "
                  mainColor={colors.buttonSubmitActive}
                  mainLoading={mainLoading}
                  mainOnPress={handleOrderCard}
                  secondaryText="ویرایش آدرس ارسال"
                  secondaryColor={colors.buttonOpenActive}
                  secondaryOnPress={() => setEdit(true)}
                  style={styles.buttonsWrapper}
                />
              </>
            )}
          </View>
        ) : (
          <View
            style={[
              styles.modalBodyContainer,
              {
                width: "100%",
                justifyContent: "center",
              },
            ]}
          >
            <View style={[styles.addressTitle, { alignItems: "center" }]}>
              <Success />
            </View>
            <View style={[styles.address, { alignItems: "center" }]}>
              <FormattedText
                style={{
                  fontSize: 14,
                  textAlign: "center",
                  color: response.isSuccess ? colors.title : colors.red,
                }}
              >
                {response.description}
              </FormattedText>
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderActivationCard = () => {
    return (
      <View style={[styles.inquiryResultWrapper]}>
        <View style={{ width: "100%" }}>
          <FormattedText
            style={{
              color: "#333333",
              fontSize: 14,
            }}
          >
            لطفا شماره کارت را وارد نمائید.
          </FormattedText>
        </View>
        <View style={{ width: "100%" }}>
          <View style={styles.modalResultRow}>
            <MaterialTextField
              label="شماره کارت"
              // onChange={clearError}
              style={{ fontFamily: "IRANSansMobileFaNum" }}
              maxLength={16}
              keyboardType="number-pad"
              onSubmitEditing={() => {}}
              onChangeText={(value: string) => {
                setCardPan(value);
                console.log("value", value);
              }}
              // error={error.field === "postalCode" ? error.message : null}
            />
          </View>
          <View style={styles.modalResultRow}>
            <FormattedText style={styles.modalResultKeyText}>
              رمز جدید
            </FormattedText>
            <View style={styles.modalResultValueTextWrapper}>
              <Input
                boxMode
                keyboardType="number-pad"
                customStyle={styles.itemInput}
                value={password}
                onChangeText={(value: string) => {
                  setPassword(value);
                }}
              />
            </View>
          </View>
          <View style={styles.modalResultRow}>
            <FormattedText style={styles.modalResultKeyText}>
              تکرار رمز جدید
            </FormattedText>
            <View style={styles.modalResultValueTextWrapper}>
              <Input
                boxMode
                keyboardType="number-pad"
                customStyle={styles.itemInput}
                value={reEnterPassword}
                onChangeText={(value: string) => {
                  setReEnterPassword(value);
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.button}>
          <Button
            color={colors.buttonOpenActive}
            title={"فعالسازی کارت"}
            // disabled={cardInfo.status == "ORDERED"}
            onPress={handleActivation}
          />
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cardBox}>
        <View style={styles.cardPack}>
          <View style={styles.imgBox}>
            <Card
              width={height * 0.89}
              height={width * 0.8}
              style={{ position: "absolute" }}
            />
            <TouchableOpacity onPress={handleTouch}>
              {cardInfo.status == "NONE" && <Plus />}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.description}>
          <View style={styles.descriptionTextBox}>
            <FormattedText
              style={styles.descriptionText}
              id={
                cardInfo.status == "NONE"
                  ? "orderBabyCard.orderDescription"
                  : "orderBabyCard.activationDescription"
              }
            />
          </View>
        </View>
      </View>
      {!isChild && cardInfo.status == "NONE" && (
        <View style={styles.button}>
          <Button
            color={colors.buttonOpenActive}
            title="سفارش کارت"
            disabled={cardInfo.status == "ORDERED"}
            onPress={handleTouch}
          />
        </View>
      )}

      {isChild && cardInfo.status == "FORCED_PIN_CHANGE" && (
        <View style={styles.button}>
          <Button
            color={colors.buttonOpenActive}
            title="فعالسازی کارت"
            disabled={cardInfo.status == "ORDERED"}
            onPress={handleTouch}
          />
        </View>
      )}

      <ActionModalButtom
        showModal={modal.visibility}
        setShowModal={() => {
          setModal({ ...modal, visibility: false });
          setMainLoading(false);
          setEdit(false);
          setAddress("");
          setResponse({
            description: "",
            isSuccess: null,
          });
        }}
        title={modal.title}
        titleAlignItems="center"
      >
        {modal.activeContent == "ORDER"
          ? renderOrderCard()
          : renderActivationCard()}
      </ActionModalButtom>
    </ScrollView>
  );
};

export default OrderBabyCard;
