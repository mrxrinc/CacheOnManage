import React from "react";
import { View } from "react-native";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { background, foreground } from "./constants";

export default () => (
  <View style={{ padding: 20, paddingBottom: 0 }}>
    <ContentLoader
      rtl
      speed={1}
      backgroundColor={background}
      foregroundColor={foreground}
    >
      <Rect x="0" y="0" rx="10" ry="10" width="48%" height="44" />
      <Rect x="52%" y="0" rx="10" ry="10" width="48%" height="44" />
      <Circle cx="50%" cy="90" r="30" />
      <Rect x="0" y="80" rx="15" ry="15" width="100%" height="200" />
      <Circle cx="50%" cy="320" r="30" />
      <Rect x="0" y="310" rx="15" ry="15" width="100%" height="200" />
    </ContentLoader>
  </View>
);
