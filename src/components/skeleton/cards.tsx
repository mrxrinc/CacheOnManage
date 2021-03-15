import React from "react";
import { View } from "react-native";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { background, foreground } from "./constants";

export default () => (
  <ContentLoader
    rtl
    speed={1}
    backgroundColor={background}
    foregroundColor={foreground}
  >
    <Rect x="0" y="0" rx="0" ry="0" width="100%" height="44" />
    <Rect x="10%" y="60" rx="15" ry="15" width="80%" height="185" />

    <Circle cx="25%" cy="290" r="30" />
    <Rect x="15%" y="330" rx="10" ry="10" width="20%" height="20" />
    <Circle cx="50%" cy="290" r="30" />
    <Rect x="40%" y="330" rx="10" ry="10" width="20%" height="20" />
    <Circle cx="75%" cy="290" r="30" />
    <Rect x="65%" y="330" rx="10" ry="10" width="20%" height="20" />

    <Rect x="5%" y="385" rx="10" ry="10" width="30%" height="20" />
    <Rect x="80%" y="385" rx="10" ry="10" width="15%" height="20" />
    <Rect x="10%" y="425" rx="15" ry="15" width="80%" height="70" />
    <Rect x="10%" y="515" rx="15" ry="15" width="80%" height="70" />
  </ContentLoader>
);
