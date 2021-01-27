import React from "react";
import { SafeAreaView, View, Linking } from "react-native";
import Button from "components/button";
import { FormattedText } from "components/format-text";
import Modal from "react-native-modal";
import styles from "./styles";
import Update from "components/icons/update.svg";

const Force = (props: any) => {
  const { data } = props;
  return (
    <Modal style={styles.modal} useNativeDriver isVisible>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Update style={styles.img} />
          <FormattedText style={styles.title}>
            نسخه برنامه شما پشتیبانی‌ نمی‌شود!
          </FormattedText>
          <FormattedText style={styles.dsc}>
            لطفا برای استفاده از برنامه (نام) نسخه{"\n"} جدید را دریافت نمائید.
          </FormattedText>
        </View>
        <Button
          titleStyle={styles.titleBtn}
          onPress={() => Linking.openURL(data.downloadLink)}
          style={styles.button}
          title="دانلود جدیدترین نسخه"
        />
      </SafeAreaView>
    </Modal>
  );
};
export default Force;
