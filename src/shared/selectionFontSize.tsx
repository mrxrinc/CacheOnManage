import { fontSizeApp } from "global/fontSize";
import {
  miniSize,
  smallSize,
  mediumSize,
  largeSize,
  xlargeSize,
} from "global/fontType";

export const selectionFontSize = (isFatherTheme: boolean, fontSize: string) => {
  if (isFatherTheme) {
    switch (fontSize) {
      case miniSize:
        return fontSizeApp.yekan.mini;
      case smallSize:
        return fontSizeApp.yekan.small;

      case mediumSize:
        return fontSizeApp.yekan.medium;

      case largeSize:
        return fontSizeApp.yekan.large;

      case xlargeSize:
        return fontSizeApp.yekan.xlarge;

      default:
        return fontSizeApp.yekan.mini;
    }
  } else {
    switch (fontSize) {
      case miniSize:
        return fontSizeApp.iranSans.mini;
      case smallSize:
        return fontSizeApp.iranSans.small;

      case mediumSize:
        return fontSizeApp.iranSans.medium;

      case largeSize:
        return fontSizeApp.iranSans.large;

      case xlargeSize:
        return fontSizeApp.iranSans.xlarge;

      default:
        return fontSizeApp.iranSans.mini;
    }
  }
};
