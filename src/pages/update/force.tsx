import React from "react";
import { StyleSheet, Text, SafeAreaView, Image, View } from "react-native";
import ForceImg from "images/update/force-update.png";
import Button from "components/button";
import { FormattedText } from "components/format-text";
import Modal from "react-native-modal";

const Force = () => {
  return (
    <Modal style={styles.modal} useNativeDriver isVisible>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Image style={styles.img} source={ForceImg} />
          <FormattedText style={styles.title}>
            نسخه برنامه شما پشتیبانی‌ نمی‌شود!
          </FormattedText>
          <FormattedText style={styles.dsc}>
            لطفا برای استفاده از برنامه (نام) نسخه{"\n"} جدید را دریافت نمائید.
          </FormattedText>
        </View>
        <Button style={styles.button} title="دانلود جدیدترین نسخه" />
      </SafeAreaView>
    </Modal>
  );
};
export default Force;
const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    backgroundColor: "#f4f6fa",
    flex: 1,
    alignItems: "center",
  },
  img: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "89%",
    height: 44,
    backgroundColor: "#307fe2",
    borderRadius: 10,
    marginBottom: 50,
  },
  title: {
    marginTop: 32,
    marginBottom: 22,
    fontWeight: "500",
    fontSize: 18,
  },
  dsc: {
    textAlign: "center",
    lineHeight: 17,
    color: "#707070",
    fontSize: 16,
  },
  content: {
    justifyContent: "center",
    flex: 1,
  },
});
