import { bold, regular, medium, faNum, faNumBold } from "global/fontType";
import { fonts } from "global/font";

export const selectionFontFamily = (
  isFatherTheme: boolean,
  fontfamily: string
) => {
  if (isFatherTheme) {
    switch (fontfamily) {
      case regular:
        return fonts.yekan.regular;
      case medium:
        return fonts.yekan.medium;

      case bold:
        return fonts.yekan.bold;

      case faNum:
        return fonts.yekan.faNum;

      case faNumBold:
        return fonts.yekan.faNumBold;

      default:
        return fonts.yekan.regular;
    }
  } else {
    switch (fontfamily) {
      case regular:
        return fonts.iranSans.regular;
      case medium:
        return fonts.iranSans.medium;

      case bold:
        return fonts.iranSans.bold;

      case faNum:
        return fonts.iranSans.faNum;

      case faNumBold:
        return fonts.iranSans.faNumBold;

      default:
        return fonts.iranSans.regular;
    }
  }
};
