const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  // When the mode is set to "production", the JS file is output in an optimized state
  // When the mode is set to "development", the source map is valid and the JS file is output
  // mode: "production",
  // or
  mode: "development",
  entry: "./src/index.js",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Pixi.js Demo"
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/assets", to: "assets"
        }
      ]
    })
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ]
  }
};
