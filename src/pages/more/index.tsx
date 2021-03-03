import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Bill from "components/icons/more-bill.svg";
import Internet from "components/icons/more-internet.svg";
import Qr from "components/icons/more-qr.svg";
import TopUp from "components/icons/more-topUp.svg";
import Spending from "components/icons/spending.svg";
import { FormattedText } from "components/format-text";
import MainHeader from "components/mainHeader";
import Layout from "components/layout";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../customType";
import { QuickAccessRootPage } from "store/QuickAccess/quickAccess.actions";
import { withTheme } from "themeCore/themeProvider";
import { iosBoxShadow } from "constants/index";

const { width, height } = Dimensions.get("window");

const More = ({ theme }: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isChild = useSelector<RootState, any>((state) => state.user.ischild);
  return (
    <Layout>
      <MainHeader title={"بیشتر"} />
      <View style={styles.container}>
        {isChild ? (
          <View style={styles.items}>
            <View style={styles.content}>
              <TouchableOpacity
                style={styles.itemsBox}
                onPress={() => navigation.navigate("QRPayment")}
              >
                <Qr />
                <FormattedText style={styles.descriptionText} id="qr_Payment" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.itemsBox}
                onPress={() => {
                  dispatch(QuickAccessRootPage("mobileTopUp"));
                  navigation.navigate("quickAccess");
                }}
              >
                <TopUp />
                <FormattedText
                  style={styles.descriptionText}
                  id="mobile_TopUp"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.content}>
              <TouchableOpacity
                style={styles.itemsBox}
                onPress={() => {
                  navigation.navigate("selectCarrier");
                }}
              >
                <Internet />
                <FormattedText
                  style={styles.descriptionText}
                  id="mobile_internet"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.itemsBox}
                onPress={() => {
                  dispatch(QuickAccessRootPage("mobileBillPayment"));
                  navigation.navigate("quickAccess");
                }}
              >
                <Bill />
                <FormattedText
                  style={styles.descriptionText}
                  id="mobile_bill"
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.items}>
            <View style={styles.content}>
              <TouchableOpacity
                style={styles.itemsBox}
                onPress={() => navigation.navigate("spendParent")}
              >
                <View style={styles.iconBox}>
                  <Spending fill={theme.more.iconColor} />
                </View>
                <FormattedText
                  style={styles.descriptionText}
                  id="child_spending"
                />
              </TouchableOpacity>
              <View />
            </View>
          </View>
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f6fa",
    alignItems: "center",
    flex: 1,
  },
  imageBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: width * 0.89,
    marginTop: "5%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  descriptionText: {
    fontSize: 16,
    textAlign: "center",
    color: "#192024",
  },
  itemsBox: {
    width: width * 0.42,
    height: height * 0.23,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 3,
    ...iosBoxShadow,
  },
  items: {
    flex: 0.6,
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconBox: {
    justifyContent: "center",
    alignItems: "center",
    width: 56,
    height: 56,
    backgroundColor: "rgb(233,242,253)",
    borderRadius: 40,
  },
});
export default withTheme(More);
