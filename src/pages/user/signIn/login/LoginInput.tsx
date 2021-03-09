import React from "react";
import { View, StyleSheet } from "react-native";
import InputApp from "shared/inputs/InputApp";
import InputFather from "shared/inputs/InputFather";

const LoginInput = (props: any) => {
  const { clearError, setUsername, setPassword, username, password } = props;
  return (
    <View style={styles.container}>
      <InputApp
        placeholder="نام کاربری"
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
        placeholder="رمز عبور"
        containerStyle={styles.input}
        isPassword
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
});
