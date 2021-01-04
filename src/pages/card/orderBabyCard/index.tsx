import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { FormattedText } from "components/format-text";
import Card from "images/cards/orderBabyCard/card.png";
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
import { RootStateType } from "../../../../customType";
import MaterialTextField from "components/materialTextfield";
import Input from "components/input";
import CardsActions from "store/Cards/cards.action";

interface IResponse {
  description: String;
  isSuccess: any;
}
const OrderBabyCard = (props: any) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState<ModalType>(OFFLOAD_MODAL);
  const cardInfo = props.cardsInfo;
  const token = useSelector<RootStateType, any>((state) => state.user.token);
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
  console.log("cardInfo is", cardInfo);
  const handleOrderCard = () => {
    setMainLoading(true);
    const data = {
      childId: cardInfo.childId,
      postalCode: postalCode,
    };
    console.log("setOrderCard response", data);
    setOrderCard(token, data)
      .then((response) => {
        console.log("setOrderCard response", response);
        setMainLoading(false);
        setResponse({
          description: response.data.success,
          isSuccess: true,
        });
        dispatch(CardsActions.callCardInfo("orderCard"));
      })
      .catch((err) => {
        console.log("setOrderCard err", err);
        setMainLoading(false);
        setResponse({
          description: err.response.data.message,
          isSuccess: false,
        });
        console.log("setOrderCard err", err.response);
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
    console.log("handleActivation response", data);
    setCardActive(token, data)
      .then((response) => {
        console.log("handleActivation response", response);
        setResponse({
          description: response.data.success,
          isSuccess: true,
        });
        dispatch(CardsActions.callCardInfo("activationCard"));
      })
      .catch((err) => {
        console.log("handleActivation err1", err);
        setResponse({
          description: err.response.data.message,
          isSuccess: false,
        });
      });
  };
  const handleAddressCheck = (postalCode: string) => {
    console.log("handleAddressCheck postal code ", postalCode);
    setPostalCode(postalCode);
    addressInqury(token, postalCode)
      .then((response) => {
        console.log("handleAddressCheck response", response.data.address);
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
                <FormattedText style={styles.addressTitleText}>
                  کارت به آدرس زیر ارسال میشود:
                </FormattedText>
              </View>
              <View style={{ width: "89%" }}>
                {edit && (
                  <MaterialTextField
                    label="کد پستی"
                    // onChange={clearError}
                    style={{ fontFamily: "IRANSansFaNum" }}
                    maxLength={10}
                    keyboardType="number-pad"
                    onSubmitEditing={() => {}}
                    onChangeText={(value: string) => {
                      if (value.length === 10) handleAddressCheck(value);
                    }}
                    // error={error.field === "postalCode" ? error.message : null}
                  />
                )}
              </View>
              <View style={styles.address}>
                {!edit ? (
                  <FormattedText style={{ fontSize: 14 }}>
                    {cardInfo.address}
                  </FormattedText>
                ) : (
                  <FormattedText style={{ fontSize: 14 }}>
                    {address}
                  </FormattedText>
                )}
              </View>
            </View>
            <UnequalTwinButtons
              buttonType={edit ? "single" : "equal"}
              mainText="تائید آدرس و سفارش "
              mainColor={colors.buttonSubmitActive}
              mainLoading={mainLoading}
              mainOnPress={handleOrderCard}
              secondaryText="ویرایش آدرس ارسال"
              secondaryColor={colors.buttonOpenActive}
              secondaryOnPress={() => {
                setEdit(true);
              }}
              style={styles.buttonsWrapper}
            />
          </View>
        ) : (
          <View
            style={[
              styles.modalBodyContainer,
              {
                width: response.isSuccess ? "89%" : "100%",
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
                  color: response.isSuccess ? "#00015d" : "red",
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
              style={{ fontFamily: "IRANSansFaNum" }}
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
    <View style={styles.container}>
      <View style={styles.cardBox}>
        <View style={styles.cardPack}>
          <View style={styles.imgBox}>
            <Image source={Card} style={styles.cardImg} />
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
      <View style={styles.button}>
        <Button
          color={colors.buttonOpenActive}
          title={cardInfo.status == "NONE" ? "سفارش کارت" : "فعالسازی کارت"}
          disabled={cardInfo.status == "ORDERED"}
          onPress={handleTouch}
        />
      </View>
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
    </View>
  );
};

export default OrderBabyCard;
