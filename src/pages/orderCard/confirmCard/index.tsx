import React, { FC, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { FormattedText } from "components/format-text";
import Header from "components/header";
import Layout from "components/layout";
import styles from "./styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../../customType";
import Button from "components/button";
import { withTheme } from "themeCore/themeProvider";
import FullScreenModal from "components/modal/actionModalFullScreen";
import PostalCodeInquiry from "../confirmAddress/postalCodeInquiry";
import Address from "../confirmAddress/address";
import { orderCard } from "utils/api";
import ActionModalButtom from "components/modal/actionModalBottom";
import Success from "images/cards/orderBabyCard/success.svg";

const ConfirmCard: FC = ({ navigation, route, theme }: any) => {
  const { childId, fromAddChild } = route.params;
  const { frontImage, backImage, avatar, template, vip } = route.params;
  const [loading, setLoading] = useState(false);
  const [flip, setFlip] = useState<boolean>(false);
  const [showAddressInquiryModal, setShowAddressInquiryModal] = useState<
    boolean
  >(false);
  const [postalCode, setPostalcode] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [street, setStreet] = useState("");
  const [buildingNo, setBuildingNo] = useState("");
  const [floor, setFloor] = useState("");
  const [modalPage, setModalPage] = useState<"postalCode" | "address">(
    "postalCode"
  );
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const token = useSelector<RootState, any>((state) => state.user.token);
  const fatherAddress = useSelector<RootState, any>(
    (state) => state.home.homeData.address
  );

  const handleConfirm = ({ province, city, address }: any) => {
    if (typeof fromAddChild !== "function") {
      setLoading(true);
      orderCard(token, {
        childId,
        province,
        city,
        street,
        buildingNo,
        floor,
        address,
        postalCode,
        phone,
        avatar,
        template,
        vip,
      })
        .then((response) => {
          setLoading(false);
          setShowAddressInquiryModal(false);
          if (fromAddChild) {
            navigation.navigate("inquiryAddress", {
              hasCard: true,
            });
          } else {
            setShowSuccessModal(true);
          }
          console.debug({ response });
        })
        .catch((error) => {
          console.warn(error.response);
          setShowAddressInquiryModal(false);
          setError(
            `${error.response.status} - ${error.response.data?.message}`
          );
          setLoading(false);
        });
    } else {
      fromAddChild({
        province,
        city,
        street,
        buildingNo,
        floor,
        address,
        postalCode,
        phone,
        avatar,
        template,
        vip,
      });
      navigation.pop(2);
    }
  };

  const handleGetAddressDetail = ({
    province,
    city,
    street,
    buildingNo,
    floor,
    address,
    postalCode,
    phone,
  }: any) => {
    setPostalcode(postalCode);
    setPhone(phone);
    setProvince(province);
    setCity(city);
    setStreet(street);
    setBuildingNo(buildingNo);
    setFloor(floor);
    setClientAddress(address);
    setModalPage("address");
  };

  return (
    <Layout>
      <Header
        staticTitle={"orderCard"}
        handleBack={() => navigation.goBack()}
      />
      <View style={{ flex: 1 }}>
        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.card} onPress={() => setFlip(!flip)}>
            <Image
              source={!flip ? frontImage : backImage}
              style={styles.cardImage}
            />
            {!flip && !!avatar && vip && (
              <View style={styles.avatarWrapper}>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: `data:image/png;base64, ${avatar}`,
                  }}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.addressSection}>
          <FormattedText style={styles.Title} fontFamily="Bold">
            کارت به آدرس زیر ارسال می‌شود:
          </FormattedText>
          <FormattedText style={styles.Description}>
            {!!clientAddress || !!fatherAddress || "شما آدرس ثبت نکرده اید!"}
          </FormattedText>
          <View style={styles.addressButtonWrapper}>
            <Button
              title={
                !clientAddress && !fatherAddress ? "ثبت آدرس" : "ویرایش آدرس"
              }
              onPress={() => setShowAddressInquiryModal(true)}
              color={theme.ButtonBlueColor}
            />
          </View>
        </View>
      </View>

      {!!error && (
        <FormattedText style={[styles.successMessage, { color: "red" }]}>
          {error}
        </FormattedText>
      )}

      <View style={styles.buttonWrapper}>
        <Button
          title="تائید و سفارش"
          onPress={handleConfirm}
          color={theme.ButtonGreenColor}
          loading={loading}
          disabled={loading || (!clientAddress && !fatherAddress)}
        />
      </View>

      <FullScreenModal
        showModal={showAddressInquiryModal}
        setShowModal={setShowAddressInquiryModal}
        title={modalPage === "postalCode" ? "ویرایش آدرس" : "تایید آدرس پستی"}
        contentStyle={styles.modalContent}
        back={modalPage === "address" ? () => setModalPage("postalCode") : null}
      >
        {modalPage === "postalCode" && (
          <PostalCodeInquiry
            handleGetAddressDetail={handleGetAddressDetail}
            savedPostalCode={postalCode || null}
            savedPhone={phone || null}
          />
        )}
        {modalPage === "address" && (
          <Address
            handleConfirm={handleConfirm}
            savedProvince={province}
            savedCity={city}
            savedAddress={clientAddress}
            loading={loading}
          />
        )}
      </FullScreenModal>

      <ActionModalButtom
        showModal={showSuccessModal}
        setShowModal={() => {
          setShowSuccessModal(false);
          navigation.navigate("cardTab");
        }}
      >
        <View style={[styles.successModalContent]}>
          <View style={styles.successIcon}>{!error && <Success />}</View>
          <View style={styles.successContent}>
            <FormattedText style={styles.successMessage}>
              {!!error ? error : "سفارش کارت با موفقیت ثبت شد."}
            </FormattedText>
          </View>
        </View>
      </ActionModalButtom>
    </Layout>
  );
};

export default withTheme(ConfirmCard);
