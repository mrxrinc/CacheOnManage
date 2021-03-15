import React from "react";
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
        <Header staticTitle={rootPage} handleBack={() => navigation.goBack()} />
        <MobileInfo />
        <MNP />
    </Layout>
  );
};
export default MobileServices;
