import React, { FC, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { colors } from "constants/index";
import { FormattedText } from "components/format-text";
import Header from "components/header";
import Layout from "components/layout";
import styles from "./styles";
import Button from "components/button";
import { withTheme } from "themeCore/themeProvider";

const ConfirmCard: FC = ({ navigation, route, theme }: any) => {
  const { frontImage, backImage } = route.params;
  const [flip, setFlip] = useState<boolean>(false);
  const handleConfirm = () => {
    navigation.navigate("confirmCard");
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
              onPress={handleConfirm}
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
    </Layout>
  );
};

export default withTheme(ConfirmCard);
