import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import Force from "pages/update/force";
import ModalUpdate from "./modal";
import DeviceInfo from "react-native-device-info";
import { getUpdate } from "utils/api";

const index = () => {
  const [status, setStatus] = useState("updated");
  const [updateData, setUpdateData] = useState(null);
  useEffect(() => {
    let uniqueId = DeviceInfo.getUniqueId();
    let version = DeviceInfo.getVersion();
    let systemVersion = DeviceInfo.getSystemVersion();
    const Data = {
      osVersion: systemVersion,
      appVersion: version,
      deviceId: uniqueId,
      osType: Platform.OS,
    };

    getUpdate(Data).then((response: any) => {
      const { data } = response;
      setStatus(data.state);
      setUpdateData(data);
      console.log(response);
    });
  }, []);
  switch (status) {
    case "updated":
      return null;
    case "force":
      return <Force data={updateData} />;
    case "codePush":
      return <ModalUpdate isCodePush data={updateData} />;
    case "light":
      return <ModalUpdate data={updateData} />;
    default:
      return null;
  }
};
export default index;
