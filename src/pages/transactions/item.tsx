import { FormattedText } from "components/format-text";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import More from "components/icons/back.svg";

const Item = (props: any) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("detailItem")}
      activeOpacity={0.8}
      style={styles.container}
    >
      <View style={styles.moreIcon}>
        <Text>t</Text>
      </View>
      <View style={styles.title}>
        <FormattedText style={styles.titleText}>
          برداشت از خودپرداز
        </FormattedText>
        <FormattedText style={styles.titleTime} fontFamily="Regular-FaNum">
          99/4/9{"  "}12:30
        </FormattedText>
      </View>
      <View style={styles.payment}>
        <FormattedText style={styles.paymentTop} fontFamily="Regular-FaNum">
          5,000,000 - ریال
        </FormattedText>
        <FormattedText style={styles.paymentBottom} fontFamily="Regular-FaNum">
          12,250,663 - ریال
        </FormattedText>
      </View>
      <View style={styles.statusIcon}>
        {/* <More /> */}
        <Text>t</Text>
      </View>
    </TouchableOpacity>
  );
};
export default Item;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 15,
    shadowOpacity: 1,
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 11,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  moreIcon: {
    backgroundColor: "#ffecec",
    borderRadius: 5,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  payment: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 11,
  },
  title: {
    flex: 1,
    marginLeft: 10,
  },
  statusIcon: {},
  paymentTop: {
    color: "#e40046",
    fontSize: 16,
    marginBottom: 3,
  },
  paymentBottom: {
    color: "#707070",
  },
  titleText: {
    color: "#110820",
    marginBottom: 3,
    fontSize: 16,
  },
  titleTime: {
    color: "#707070",
  },
});
