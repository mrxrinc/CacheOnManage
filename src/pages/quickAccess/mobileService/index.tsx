import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Layout from "components/layout";
import Header from "components/header";
import { useSelector } from "react-redux";
import { RootStateType } from "../../../../customType";
import MobileInfo from "./mobileInfo";
import MNP from "./mobileNumberPortability";

const MobileServices = () => {
  const navigation = useNavigation();

  const rootPage = useSelector<RootStateType, any>(
    (state) => state.quickAccess.rootPage
  );
  return (
    <Layout>
      <View style={styles.container}>
        <Header staticTitle={rootPage} handleBack={() => navigation.goBack()} />
        <MobileInfo />
        <MNP />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center" },
});
export default MobileServices;
