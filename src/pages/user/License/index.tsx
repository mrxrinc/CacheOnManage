import React from "react";
import { StatusBar, Text, View } from "react-native";
import styles from "./styles";
import Header from "components/header";
import { colors } from "constants/index";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const License = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={false}
        hidden={false}
        animated
        barStyle="dark-content"
        backgroundColor={colors.white}
      />
      <Header isKyc hasClose dynamicTitle={"افتتاح آنلاین حساب"} />
      <KeyboardAwareScrollView style={styles.content}>
        <Text>test</Text>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default License;
