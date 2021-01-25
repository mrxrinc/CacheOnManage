import React, { useEffect, useState } from "react";
import { Platform, Text } from "react-native";
import Force from "pages/update/force";
import ModalUpdate from "./modal";
import DeviceInfo from "react-native-device-info";

const index = () => {
  const [status, setStatus] = useState("updated");
  useEffect(() => {
    let uniqueId = DeviceInfo.getUniqueID();
    let version = DeviceInfo.getVersion();
    let systemVersion = DeviceInfo.getSystemVersion();

    console.log("Version: " + version);
    console.log("Unique id: " + uniqueId);
    console.log("OS version: " + systemVersion);
    console.log("OS: " + Platform.OS);
  }, []);
  switch (status) {
    case "updated":
      return null;
    case "force":
      return <Force />;
    case "codepush":
      return <ModalUpdate isCodePush />;
    case "light":
      return <ModalUpdate />;
    default:
      return null;
  }
};
export default index;
