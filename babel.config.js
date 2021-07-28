module.exports = {
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        root: ['.'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
  presets: ['module:metro-react-native-babel-preset'],
}
