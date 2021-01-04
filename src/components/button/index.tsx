import React from "react";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import { FormattedText } from "components/format-text";
import { colors, IOS } from "constants/index";
import styles from "./styles";

type Props = {
  title: string;
  onPress: () => void;
  outline?: boolean;
  style?: any;
  titleStyle?: any;
  fontSize?: number;
  color?: string;
  disabled?: boolean;
  loading?: boolean;
};

function handleBackground(
  color?: string,
  outline?: boolean,
  disabled?: boolean
) {
  if (outline) return colors.white;
  if (color && !outline && !disabled) return color;
  if (color && !outline && disabled) return `${color}77`;
  return colors.gray700;
}

export default ({
  title,
  outline,
  onPress,
  color,
  fontSize,
  style,
  titleStyle,
  disabled,
  loading,
  ...props
}: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: handleBackground(color, outline, disabled),
          borderWidth: disabled ? 0 : outline ? 1 : 0,
          borderColor: outline ? color : "transparent",
          elevation: disabled ? 0 : 3,
          shadowOpacity: disabled ? 0 : 0.18,
          ...style,
        },
      ]}
      disabled={disabled}
      onPress={onPress}
      {...props}
    >
      {!loading ? (
        <FormattedText
          fontFamily="Bold"
          style={{
            lineHeight: IOS ? 15 : 25,
            fontSize: fontSize ? fontSize : 16,
            color: disabled ? colors.white : outline ? color : colors.white,
            ...titleStyle,
          }}
        >
          {title}
        </FormattedText>
      ) : (
        <ActivityIndicator color={colors.white} />
      )}
    </TouchableOpacity>
  );
};
