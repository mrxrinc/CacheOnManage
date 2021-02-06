import React from "react";
import { StatusBar } from "react-native";

const StatusLogin = (props: any) => {
  const { theme } = props;
  return (
    <StatusBar
      backgroundColor={theme.backgroundColor}
      animated
      hidden={false}
      barStyle={theme.statusBarContent}
    />
  );
};
export default StatusLogin;
