import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { background, foreground } from "./constants";

export default () => (
  <ContentLoader
    rtl
    speed={1}
    backgroundColor={background}
    foregroundColor={foreground}
  >
    <Rect x="0" y="0" rx="0" ry="0" width="100%" height="44" />
    <Rect x="35%" y="65" rx="10" ry="10" width="30%" height="35" />
    <Rect x="5%" y="120" rx="5" ry="5" width="90%" height="10" />
    <Rect x="5%" y="150" rx="10" ry="10" width="40%" height="22" />
    <Rect x="70%" y="150" rx="10" ry="10" width="25%" height="22" />
    <Rect x="5%" y="180" rx="10" ry="10" width="30%" height="22" />
    <Rect x="75%" y="180" rx="10" ry="10" width="20%" height="22" />
    <Rect x="5%" y="210" rx="10" ry="10" width="35%" height="22" />
    <Rect x="65%" y="210" rx="10" ry="10" width="30%" height="22" />
    <Rect x="5%" y="240" rx="10" ry="10" width="45%" height="22" />
    <Rect x="80%" y="240" rx="10" ry="10" width="15%" height="22" />
    <Rect x="0" y="280" rx="0" ry="0" width="100%" height="40" />
    <Rect x="5%" y="350" rx="7" ry="7" width="30%" height="22" />
    <Rect x="5%" y="385" rx="15" ry="15" width="90%" height="100" />
    <Rect x="5%" y="425" rx="15" ry="15" width="90%" height="100" />
  </ContentLoader>
);
