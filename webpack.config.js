const { resolve } = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/server.ts",
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist"),
  },

  // File resolutions
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      fs: false,
      net: false,
    },
  },

  // generate cource maps -- for debugging
  devtool: "source-map",

  plugins: [new NodePolyfillPlugin()],

  // Loaders
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        include: [resolve(__dirname, "src")],
      },
    ],
  },
  watch: true,
};
