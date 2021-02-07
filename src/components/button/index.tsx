import React from "react";
import { View, TouchableHighlight, ActivityIndicator } from "react-native";
import { FormattedText } from "components/format-text";
import { colors, IOS } from "constants/index";
import styles from "./styles";
import { withTheme } from "themeCore/themeProvider";
import { shadeColor } from "utils";

const defaultColor = colors.gray700;

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
  theme: any;
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
  style,
  titleStyle,
  disabled,
  loading,
  ...props
}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={[
          styles.button,
          {
            backgroundColor: handleBackground(color, outline, disabled),
            borderWidth: disabled ? 0 : outline ? 1 : 0,
            borderColor: outline ? color : "transparent",
            elevation: disabled ? 0 : 3,
            shadowOpacity: disabled ? 0 : 0.18,
            borderRadius: theme.buttonBorderRadius,
            ...style,
          },
        ]}
        underlayColor={shadeColor(color, -10)}
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
      </TouchableHighlight>
    </View>
  );
};

export default withTheme(Button);
