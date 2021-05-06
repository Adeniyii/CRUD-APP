const { resolve } = require("path");

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
  },

  // generate cource maps -- for debugging
  devtool: "source-map",

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
