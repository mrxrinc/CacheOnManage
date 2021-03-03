import React, { useState } from "react";
import { View, TouchableHighlight, ActivityIndicator } from "react-native";
import { FormattedText } from "components/format-text";
import { colors, IOS, width } from "constants/index";
import styles from "./styles";
import { withTheme } from "themeCore/themeProvider";
import Fingerprint from "components/icons/fingerprint.svg";
import FaceIDIcon from "components/icons/face-id.svg";
import { shadeColor } from "utils";

const defaultColor = colors.buttonOpenActive;

type Props = {
  title: string;
  onPress: () => void;
  outline?: boolean;
  style?: any;
  titleStyle?: any;
  fontSize?: number;
  lineHeight?: number;
  color?: string;
  disabled?: boolean;
  loading?: boolean;
  theme: any;
  isFinger?: any;
  isFaceId?: any;
  isHide?: boolean;
};

function handleBackground(
  color?: string,
  outline?: boolean,
  disabled?: boolean
) {
  if (outline) return colors.white;
  if (color && !outline && !disabled) return color;
  if (color && !outline && disabled) return `${color}77`;
  return defaultColor;
}

const Button = ({
  theme,
  title,
  outline,
  onPress,
  color = defaultColor,
  fontSize,
  lineHeight,
  style,
  titleStyle,
  disabled,
  loading,
  isFinger,
  isFaceId,
  isHide,
  ...props
}: Props) => {
  return !isHide ? (
    <View
      style={[
        styles.container,
        {
          borderRadius: theme.buttonBorderRadius,
          backgroundColor: handleBackground(color, outline, disabled),
          borderWidth: disabled ? 0 : outline ? 1 : 0,
          borderColor: outline ? color : "transparent",
          elevation: disabled ? 0 : 3,
          shadowOpacity: disabled ? 0 : 0.18,
          ...style,
        },
      ]}
    >
      <TouchableHighlight
        style={[styles.button, { borderRadius: theme.buttonBorderRadius }]}
        underlayColor={!outline ? shadeColor(color, -10) : colors.gray850}
        disabled={disabled}
        onPress={onPress}
        {...props}
      >
        {!loading ? (
          <>
            {isFaceId && (
              <FaceIDIcon fill={colors.white} width={16} height={16} />
            )}
            {isFinger && (
              <Fingerprint fill={colors.white} width={16} height={16} />
            )}
            <FormattedText
              fontFamily="Bold"
              style={{
                lineHeight: lineHeight ? lineHeight : IOS ? 15 : 25,
                fontSize: fontSize ? fontSize : 16,
                marginLeft: isFinger || isFaceId ? 8 : 0,
                color: disabled ? colors.white : outline ? color : colors.white,
                ...titleStyle,
              }}
            >
              {title}
            </FormattedText>
          </>
        ) : (
          <ActivityIndicator color={colors.white} />
        )}
      </TouchableHighlight>
    </View>
  ) : null;
};

export default withTheme(Button);
