import React from "react";
import { RootState } from "../../../customType";
import { useSelector } from "react-redux";
import InputFather from "./InputFather";
import InputChild from "./InputChild";

const InputApp = (props: any) => {
  const {
    placeholder,
    leftComponent,
    containerStyle,
    isBordered,
    inputStyle,
    isPassword,
    isError,
  } = props;
  const isChild = useSelector<RootState, any>((state) => state.user.ischild);

  return isChild ? (
    <InputChild
      placeholder={placeholder}
      inputStyle={inputStyle}
      isPassword={isPassword}
      isError={isError}
      {...props}
    />
  ) : (
    <InputFather
      containerStyle={containerStyle}
      leftComponent={leftComponent}
      placeholder={placeholder}
      inputStyle={inputStyle}
      isBordered={isBordered}
      isPassword={isPassword}
      {...props}
    />
  );
};
export default InputApp;
