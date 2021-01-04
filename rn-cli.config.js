module.exports = {
  getTransformModulePath() {
    return require.resolve("react-native-typescript-transformer");
  },
  getSourceExts() {
    return ["ts", "tsx"];
  },
  project: {
    ios: {},
    android: {},
  },
  assets: ["./assets/fonts"],
};
