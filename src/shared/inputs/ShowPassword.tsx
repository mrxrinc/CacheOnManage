import React from "react";
import PasswordVisibleIcon from "components/icons/passwordVisible.svg";
import PasswordIcon from "components/icons/password.svg";

const ShowPassword = (props: any) => {
  const { onShow, onHide, isSecure } = props;
  return isSecure ? (
    <PasswordIcon width={22} height={22} onPress={onShow} />
  ) : (
    <PasswordVisibleIcon width={22} height={22} onPress={onHide} />
  );
};
export default ShowPassword;
