import React, { useState, useEffect, useRef, forwardRef } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import { FilledTextField } from "react-native-material-textfield";
import { FormattedText } from "components/format-text";
import { colors } from "constants/index";
import ArrowIcon from "components/icons/arrow.svg";
import ErrorIcon from "components/icons/error.svg";
import PasswordIcon from "components/icons/password.svg";
import PasswordVisibleIcon from "components/icons/passwordVisible.svg";
import style from "./style";
import { withTheme } from "../../themeCore/themeProvider";

const MaterialTextField = forwardRef((props: any, ref: any) => {
  let theme = props.theme;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputRef = ref ?? useRef(null);

  // useEffect(() => {
  //   inputRef.current.setValue(props.value);
  // }, [props.value]);

  return (
    <View style={[style.container, props.style]}>
      {theme.key == "FATHER BLU JUNIOR" ? (
        <View style={style.blujrInputWrapper}>
          <TextInput
            style={style.blujrInput}
            placeholder={props.label}
            value={props.value}
            ref={inputRef}
            {...props}
          />
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
            contentInset={{ label: 5 }}
            style={style.inputStyle}
            onFocus={props.isOnFcous}
            defaultValue={props.value}
            ref={inputRef}
            secureTextEntry={props.icon === "password" ? !showPassword : false}
            renderRightAccessory={renderIcon({
              icon: props.icon,
              error: props.error,
              showPassword,
              setShowPassword,
            })}
            {...props}
          />

          {props.hasUnit && (
            <FormattedText id={"home.rial"} style={style.unit} />
          )}
        </View>
      )}
    </View>
  );
});

const renderIcon = ({ icon, error, showPassword, setShowPassword }: any) => {
  if (icon === "arrow") {
    return () => (
      <ArrowIcon
        width={30}
        height={30}
        style={{
          transform: [{ rotate: "270deg" }, { translateY: -15 }],
          color: colors.gray700,
        }}
      />
    );
  } else if (error) {
    return () => (
      <ErrorIcon
        width={20}
        height={20}
        style={{
          transform: [{ translateX: -10 }],
          color: colors.red,
        }}
      />
    );
  } else if (icon === "password") {
    return () => (
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        {showPassword ? (
          <PasswordIcon
            width={22}
            height={22}
            style={{
              color: colors.gray300,
              right: -10,
            }}
          />
        ) : (
          <PasswordVisibleIcon
            width={22}
            height={22}
            style={{
              color: colors.gray600,
              right: -10,
            }}
          />
        )}
      </TouchableOpacity>
    );
  }
};

export default withTheme(MaterialTextField);
