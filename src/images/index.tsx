import React from "react";
import { Image, ImageProps } from "react-native";

import tabbarIcon from "./tabbar";

enum SIZE {
  nano = 16,
  tiny = 24,
  small = 32,
  medium = 48,
  large = 65,
  huge = 80,
}

export type IconName = keyof typeof tabbarIcon;

type Props = {
  name: IconName;
  size: keyof typeof SIZE | number;
} & Omit<ImageProps, "source">;

export const Icon = ({ size, name, ...props }: Props) => {
  let _size: number;
  if (typeof size === "number") {
    _size = size;
  } else {
    _size = SIZE[size];
  }
  return (
    <Image
      style={{ width: _size, height: _size }}
      resizeMode="contain"
      source={tabbarIcon[name]}
      {...props}
    />
  );
};
