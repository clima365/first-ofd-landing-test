const glob = require("glob");
const path = require("path");

const HTMLWebpackPlugin = require("html-webpack-plugin");

const generateHTMLPlugins = () =>
  glob.sync("./src/*.html").map(
    dir =>
      new HTMLWebpackPlugin({
        filename: path.basename(dir), // Output
        template: dir // Input
      })
  );

module.exports = {
  entry: ["./src/main.js", "./src/main.styl"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.js"
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.styl$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "stylus-loader" // compiles Stylus to CSS
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: ["img:src", "link:href"]
          }
        }
      }
    ]
  },
  plugins: [...generateHTMLPlugins()]
};
