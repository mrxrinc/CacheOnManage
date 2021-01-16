import React, { useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/core";
import LinearGradient from "react-native-linear-gradient";
import LottieView from "lottie-react-native";

const Splash = () => {
  const navigation = useNavigation();

  const [birdProcces, setBirdProcces] = useState(false);
  const [step, setStep] = useState("1");

  return (
    <View style={styles.blackBackground}>
      <StatusBar hidden />
      <LinearGradient
        colors={["#bb6aff", "#397fff"]}
        style={styles.linearGradient}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.logoAnimation}>
          {step == "1" && (
            <LottieView
              style={styles.logoFile}
              source={require("../../images/splash/logo.json")}
              autoPlay
              resizeMode="cover"
              loop={false}
              duration={4000}
              onAnimationFinish={() => setStep("2")}
            />
          )}
        </View>

        {step == "2" && (
          <LottieView
            style={styles.birdsFile}
            source={require("../../images/splash/bird.json")}
            autoPlay
            resizeMode="cover"
            loop={birdProcces}
            onAnimationFinish={() => navigation.navigate("auth")}
          />
        )}
      </LinearGradient>
    </View>
  );
};
const styles = StyleSheet.create({
  blackBackground: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "#27519e",
    fontSize: 46,
  },
  logo: {
    width: 118,
    height: 67,
  },
  linearGradient: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logoAnimation: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logoFile: { width: "100%", height: "100%" },
  birdsFile: {
    position: "absolute",
    flex: 1,
  },
});

export default Splash;
