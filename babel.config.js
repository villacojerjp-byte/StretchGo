module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // babel-preset-expo (SDK 56) auto-injects the react-native-worklets
    // plugin required by react-native-reanimated v4, so no manual plugin needed.
  };
};
