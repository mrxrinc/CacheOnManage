import React from "react";
import { Text, View } from "react-native";
import InternetPackage from "components/icons/internet-package.svg";
import Barcode from "components/icons/barcode.svg";
import Qr from "components/icons/qr-payment-quick-access.svg";
import Simcard from "components/icons/simcard.svg";

const Test = () => {
  return (
    <View>
      <Text>test</Text>
      <InternetPackage width={50} height={50} fill="blue" />
      <Barcode width={50} height={50} fill="yellow" />
      <Qr width={50} height={50} fill="orange" />
      <Simcard width={50} height={50} fill="red" />
    </View>
  );
};
export default Test;
