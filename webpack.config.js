const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = () => {
  const env = dotenv.config().parsed;

  const envKeysValues = Object.keys(env).reduce((acc, current) => {
    acc[`process.env.${current}`] = JSON.stringify(env[current]);
    return acc;
  }, {});

  console.log(envKeysValues);

  return {
    entry: path.resolve(__dirname, "src", "index.tsx"),

    devtool: "source-map",

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },

    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        "@": path.resolve("./src"),
        "@hooks": path.resolve("./src/hooks"),
      },
    },

    plugins: [
      new HTMLWebpackPlugin({
        template: "./src/index.html",
      }),
      new webpack.DefinePlugin(envKeysValues),
    ],

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: "ts-loader",
        },
        {
          test: /.js$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
      ],
    },
  };
};
