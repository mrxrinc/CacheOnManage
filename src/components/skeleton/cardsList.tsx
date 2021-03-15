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
    <Rect x="5%" y="55" rx="15" ry="15" width="90%" height="80" />
    <Rect x="5%" y="145" rx="15" ry="15" width="90%" height="80" />
    <Rect x="5%" y="235" rx="15" ry="15" width="90%" height="80" />
    <Rect x="5%" y="325" rx="15" ry="15" width="90%" height="80" />
    <Rect x="5%" y="415" rx="15" ry="15" width="90%" height="80" />
    <Rect x="5%" y="505" rx="15" ry="15" width="90%" height="80" />
    <Rect x="5%" y="595" rx="15" ry="15" width="90%" height="80" />
    <Rect x="5%" y="685" rx="15" ry="15" width="90%" height="80" />
    <Rect x="5%" y="775" rx="15" ry="15" width="90%" height="80" />
  </ContentLoader>
);
