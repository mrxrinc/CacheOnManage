import React from "react";
import { RootState } from "../../../customType";
import { useSelector } from "react-redux";
import InputFather from "./InputFather";
import InputChild from "./InputChild";

const InputApp = (props: any) => {
  const {
    label,
    leftComponent,
    containerStyle,
    isBordered,
    inputStyle,
    isPassword,
    isError,
    errorMsg,
    value,
  } = props;
  const isChild = useSelector<RootState, any>((state) => state.user.ischild);
  return isChild ? (
    <InputChild
      containerStyle={containerStyle}
      leftComponent={leftComponent}
      inputStyle={inputStyle}
      isPassword={isPassword}
      isError={isError}
      errorMsg={errorMsg}
      label={label}
      value={value}
      {...props}
    />
  ) : (
    <InputFather
      containerStyle={containerStyle}
      leftComponent={leftComponent}
      label={label}
      inputStyle={inputStyle}
      isBordered={isBordered}
      isPassword={isPassword}
      isError={isError}
      errorMsg={errorMsg}
      value={value}
      {...props}
    />
  );
};
export default InputApp;
