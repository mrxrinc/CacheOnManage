import React from "react";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { background, foreground } from "./constants";

export default () => (
  <ContentLoader
    rtl
    speed={1}
    backgroundColor={background}
    foregroundColor={foreground}
  >
    <Rect x="0" y="0" width="100%" height="40" />
    <Circle cx="85%" cy="110" r="40" />
    <Rect x="20" y="80" rx="10" ry="10" width="45%" height="25" />
    <Rect x="20" y="120" rx="10" ry="10" width="30%" height="15" />
    <Rect x="20" y="150" rx="10" ry="10" width="35%" height="15" />
    <Rect x="20" y="185" rx="10" ry="10" width="85%" height="15" />
    <Rect x="20" y="210" rx="10" ry="10" width="75%" height="15" />
    <Rect x="0" y="260" rx="0" ry="0" width="100%" height="38" />
    <Rect x="20" y="320" rx="10" ry="10" width="90%" height="80" />
    <Rect x="20" y="415" rx="10" ry="10" width="90%" height="90" />
  </ContentLoader>
);
