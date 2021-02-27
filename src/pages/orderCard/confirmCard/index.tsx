import React, { FC, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { FormattedText } from "components/format-text";
import Header from "components/header";
import Layout from "components/layout";
import styles from "./styles";
import Button from "components/button";
import { withTheme } from "themeCore/themeProvider";
import FullScreenModal from "components/modal/actionModalFullScreen";
import PostalCodeInquiry from "../confirmAddress/postalCodeInquiry";
import Address from "../confirmAddress/address";

const ConfirmCard: FC = ({ navigation, route, theme }: any) => {
  const { frontImage, backImage, avatar, template } = route.params;
  const [loading, setLoading] = useState(false);
  const [flip, setFlip] = useState<boolean>(false);
  const [showAddressInquiryModal, setShowAddressInquiryModal] = useState<
    boolean
  >(true);
  const [postalCode, setPostalcode] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [modalPage, setModalPage] = useState<"postalCode" | "address">(
    "postalCode"
  );

  const handleConfirm = ({ province, city, address }: any) => {
    setLoading(true);
    // orderCard({token, province, city, address: clientAddress, postalCode, phone, avatar, template})
    setLoading(false);
  };

  const handleGetAddressDetail = ({
    province,
    city,
    address,
    postalCode,
    phone,
  }: any) => {
    console.log({ province, city, address, postalCode, phone });
    setPostalcode(postalCode);
    setPhone(phone);
    setProvince(province);
    setCity(city);
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
            {!flip && !!avatar && (
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
            کارت سارا به آدرس زیر ارسال می‌شود:
          </FormattedText>
          <FormattedText style={styles.Description}>
            با انتخاب این گزینه شما می‌توانید عکس فرزندتان را روی کارت او چاپ
            کنید.
          </FormattedText>
          <View style={styles.addressButtonWrapper}>
            <Button
              title="ویرایش آدرس"
              onPress={() => setShowAddressInquiryModal(true)}
              color={theme.ButtonBlueColor}
            />
          </View>
        </View>
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title="تائید و سفارش"
          onPress={handleConfirm}
          color={theme.ButtonGreenColor}
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
            postalCode={postalCode || null}
            phone={phone || null}
          />
        )}
        {modalPage === "address" && (
          <Address
            handleConfirm={handleConfirm}
            originalProvince={province}
            originalCity={city}
            originalAddress={clientAddress}
            loading={loading}
          />
        )}
      </FullScreenModal>
    </Layout>
  );
};

export default withTheme(ConfirmCard);
