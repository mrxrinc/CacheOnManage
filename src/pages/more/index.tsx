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
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../customType";
import { QuickAccessRootPage } from "store/QuickAccess/quickAccess.actions";

const { width, height } = Dimensions.get("window");

interface StackParamList {
  quickAccess: undefined;
  QRPayment: undefined;
  mobileTopUp: undefined;
  internetPackages: undefined;
}

type Navigation = NavigationProp<StackParamList>;

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<Navigation>();
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
                  dispatch(QuickAccessRootPage("mobileBillPayment"));
                  navigation.navigate("internetPackages");
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
                onPress={() => navigation.navigate("quickAccess")}
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
                // onPress={() => navigation.navigate("QRPayment")}
              >
                <Spending />
                <FormattedText
                  style={styles.descriptionText}
                  id="child_spending"
                />
              </TouchableOpacity>
              <TouchableOpacity
                // style={styles.itemsBox}
                onPress={() => navigation.navigate("spent")}
              ></TouchableOpacity>
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
    elevation: 1,
  },
  items: {
    flex: 0.6,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
