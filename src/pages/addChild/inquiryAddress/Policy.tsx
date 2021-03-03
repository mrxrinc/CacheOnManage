import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { getPolicy } from "utils/api";
import { RootState } from "../../../../customType";
import { useSelector } from "react-redux";
import HTML from "react-native-render-html";
import { Text } from "react-native-svg";
import { colors } from "constants/index";

const Policy = () => {
  const token = useSelector<RootState, any>((state) => state.user.token);
  const [policyContent, setPolicyContent] = useState("");
  const [loading, setLoading] = useState(true);
  const contentWidth = useWindowDimensions().width * 0.9;

  const getData = () => {
    getPolicy(token)
      .then((data) => {
        setLoading(false);
        setPolicyContent(data.data.content);
      })
      .catch((err) => {
        setLoading(false);
        throw err;
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <ScrollView style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.blujrBtnOpenActive} />
      ) : (
        <HTML
          containerStyle={{ padding: 20 }}
          source={{ html: policyContent }}
          contentWidth={contentWidth}
        />
      )}
    </ScrollView>
  );
};
export default Policy;
