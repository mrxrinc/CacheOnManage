import React from "react";
import { View, StyleSheet } from "react-native";
import InputApp from "shared/inputs/InputApp";

const LoginInput = (props: any) => {
  const {
    clearError,
    setUsername,
    setPassword,
    username,
    password,
    isError,
    errorMsg,
    isChild,
  } = props;

  return (
    <View style={styles.container}>
      <InputApp
        label="نام کاربری"
        maxLength={30}
        onChange={clearError}
        onChangeText={setUsername}
        value={username}
        containerStyle={styles.input}
      />
      <InputApp
        maxLength={30}
        onChange={clearError}
        onChangeText={setPassword}
        value={password}
        label="رمز عبور"
        containerStyle={isChild ? styles.inputPass : styles.input}
        isPassword
        isError={isError}
        errorMsg={errorMsg}
      />
    </View>
  );
};
export default LoginInput;

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
  },
  container: {
    marginTop: 44,
  },
  inputPass: {
    marginBottom: 32,
  },
});
