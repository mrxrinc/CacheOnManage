import React, { FC, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { colors } from "constants/index";
import { FormattedText } from "components/format-text";
import Header from "components/header";
import Layout from "components/layout";
import styles from "./styles";
import Button from "components/button";
import { withTheme } from "themeCore/themeProvider";

const ConfirmCard: FC = (props: any) => {
  const handleConfirm = () => {
    props.navigation.navigate("confirmCard");
  };

  return (
    <Layout>
      <Header
        staticTitle={"internetPackage"}
        handleBack={() => props.navigation.goBack()}
      />
      <ScrollView></ScrollView>
      <View style={styles.buttonWrapper}>
        <Button
          title="تائید و سفارش"
          onPress={handleConfirm}
          color={colors.buttonOpenActive}
        />
      </View>
    </Layout>
  );
};

export default withTheme(ConfirmCard);
