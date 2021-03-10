import React from "react";
import { StatusBar } from "react-native";

const StatusLogin = (props: any) => {
  const { theme } = props;
  return (
    <StatusBar
      backgroundColor={theme.backgroundColor}
      animated
      translucent={false}
      hidden={false}
      barStyle={theme.statusBarContentLogin}
    />
  );
};
export default StatusLogin;
