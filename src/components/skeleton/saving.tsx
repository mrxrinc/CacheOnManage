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
    <Rect x="35%" y="75" rx="10" ry="10" width="30%" height="35" />
    <Rect x="30%" y="120" rx="10" ry="10" width="40%" height="18" />
    <Rect x="5%" y="160" rx="15" ry="15" width="90%" height="120" />
    <Rect x="5%" y="290" rx="15" ry="15" width="90%" height="120" />
    <Rect x="5%" y="420" rx="15" ry="15" width="90%" height="120" />
    <Rect x="5%" y="550" rx="15" ry="15" width="90%" height="120" />
  </ContentLoader>
);
