/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    // Include existing `extraNodeModules`
    extraNodeModules: require('node-libs-react-native'),

    // Add `.wasm` file support
    assetExts: [
      "wasm",
      ...require("metro-config/src/defaults/defaults").assetExts,
    ],
  },
};
