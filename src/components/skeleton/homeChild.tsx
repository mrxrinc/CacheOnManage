import React from "react";
import { View } from "react-native";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { background, foreground } from "./constants";

export default () => (
  <View style={{ padding: 10, paddingBottom: 0 }}>
    <ContentLoader
      rtl
      speed={1}
      backgroundColor={background}
      foregroundColor={foreground}
    >
      <Circle cx="50%" cy="45" r="45" />
      <Rect x="0" y="40" rx="15" ry="15" width="100%" height="365" />
      <Rect x="0" y="415" rx="15" ry="15" width="100%" height="50" />
      <Rect x="0" y="475" rx="15" ry="15" width="100%" height="50" />
    </ContentLoader>
  </View>
);
