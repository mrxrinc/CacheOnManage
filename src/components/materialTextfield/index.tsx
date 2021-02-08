import React, { useState, useRef, forwardRef } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import { FilledTextField } from "react-native-material-textfield";
import { FormattedText } from "components/format-text";
import { colors } from "constants/index";
import ErrorIcon from "components/icons/error.svg";
import PasswordIcon from "components/icons/password.svg";
import PasswordVisibleIcon from "components/icons/passwordVisible.svg";
import style from "./style";
import { withTheme } from "../../themeCore/themeProvider";

const MaterialTextField = forwardRef((props: any, ref: any) => {
  let theme = props.theme;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputRef = ref ?? useRef(null);

  const renderIcon = () => {
    if (props.icon === "error") {
      return (
        <ErrorIcon
          width={20}
          height={20}
          fill={colors.red}
          style={{
            transform: [{ translateX: -10 }],
          }}
        />
      );
    } else if (props.icon === "password") {
      return showPassword ? (
        <PasswordIcon width={22} height={22} fill={colors.gray300} />
      ) : (
        <PasswordVisibleIcon width={22} height={22} fill={colors.gray600} />
      );
    } else {
      return props.icon;
    }
  };

  return (
    <View style={[style.container, props.style]}>
      {theme.key === "FATHER BLU JUNIOR" ? (
        <View style={style.blujrInputBox}>
          <View style={style.blujrInputWrapper}>
            <TextInput
              style={style.blujrInput}
              placeholder={props.initValue ?? props.label}
              placeholderTextColor="#bbbcbc"
              value={props.value}
              ref={inputRef}
              secureTextEntry={
                props.icon === "password" ? !showPassword : false
              }
              {...props}
            />
          </View>
          <FormattedText style={style.errorFont}>{props.error}</FormattedText>
        </View>
      ) : (
        <View>
          <FilledTextField
            inputContainerStyle={[style.moneyInput, props.inputStyle]}
            tintColor={props.tintColor || colors.title}
            label={props.label}
            labelTextStyle={props.labelTextStyle || style.label}
            titleTextStyle={props.titleTextStyle || style.title}
            labelOffset={{ x0: 10, x1: 10, y0: 5, y1: -5 }}
            style={style.inputStyle}
            onFocus={props.isOnFcous}
            ref={inputRef}
            defaultValue={props.value}
            placeholder={props.initValue}
            placeholderTextColor={props.tintColor || colors.title}
            secureTextEntry={props.icon === "password" ? !showPassword : false}
            {...props}
          />

          {props.hasUnit && (
            <FormattedText id={"home.rial"} style={style.unit} />
          )}
        </View>
      )}
      <TouchableOpacity
        style={[
          style.iconWrapper,
          { height: theme.key === "FATHER BLU JUNIOR" ? 47 : 67 },
        ]}
        onPress={() =>
          typeof props.iconAction === "function"
            ? props.iconAction
            : props.icon === "password"
            ? setShowPassword(!showPassword)
            : null
        }
        activeOpacity={typeof props.iconAction === "function" ? 0.5 : 1}
      >
        {renderIcon()}
      </TouchableOpacity>
    </View>
  );
});

export default withTheme(MaterialTextField);
