import { FormattedText } from "components/format-text";
import React, { useState } from "react";
import { View, Linking, ScrollView } from "react-native";
import Modal from "react-native-modal";
import UnequalTwinButtons from "components/unequalTwinButtons";
import styles from "./styles";
import { colors } from "constants/index";
export const codePush = require("react-native-code-push");

const ModalUpdate = (props: any) => {
  const [isOpen, setIsOpen] = useState(true);
  const { isCodePush, data } = props;
  return (
    <Modal
      onBackdropPress={() => setIsOpen(false)}
      onBackButtonPress={() => setIsOpen(false)}
      useNativeDriver
      isVisible={isOpen}
    >
      <View style={styles.content}>
        <FormattedText id="appUpdate.title" style={styles.title} />
        <FormattedText fontFamily="Regular-FaNum" style={styles.version}>
          نسخه {data?.comingVersion}
        </FormattedText>
        <FormattedText
          id={isCodePush ? "appUpdate.dsc.codePush" : "appUpdate.dsc.light"}
          style={styles.dsc}
        />
        <ScrollView style={styles.contentScrollView}>
          {data?.updateDetails?.map((item: any, index: any) => {
            return (
              <View key={index.toString()} style={styles.item}>
                <View style={styles.itemPoint} />
                <FormattedText style={styles.itemText}>{item}</FormattedText>
              </View>
            );
          })}
        </ScrollView>
        <UnequalTwinButtons
          mainText={isCodePush ? "راه اندازی مجدد" : "دانلود جدیدترین نسخه"}
          mainColor={colors.buttonSubmitActive}
          secondaryText="بعدا"
          secondaryColor={colors.buttonOpenActive}
          style={styles.buttons}
          titleSecondaryStyle={styles.titleSecondary}
          secondaryStyle={styles.btn}
          mainStyle={styles.btn}
          secondaryOnPress={() => setIsOpen(false)}
          mainOnPress={() =>
            isCodePush
              ? codePush.restartApp()
              : Linking.openURL(data.downloadLink)
          }
        />
      </View>
    </Modal>
  );
};
export default ModalUpdate;
