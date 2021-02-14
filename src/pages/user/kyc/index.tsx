import React from "react";
import {
  SafeAreaView,
  StatusBar,
  UIManager,
  Platform,
  StyleSheet,
} from "react-native";
import HeaderKyc from "./KycHeader";
import { colors } from "constants/index";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const KycLayout = (props: any) => {
  const { title, onClose, children } = props;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={false}
        hidden={false}
        animated
        barStyle="dark-content"
        backgroundColor={colors.white}
      />
      <HeaderKyc onClose={onClose} title={title} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default KycLayout;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 10,
    backgroundColor: colors.white,
    flex: 1,
  },
});
