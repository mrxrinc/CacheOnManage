import React, { useState } from "react";
import { Text } from "react-native";
import Force from "pages/update/force";
import ModalUpdate from "./modal";
const index = () => {
  const [status, setStatus] = useState("force");
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
