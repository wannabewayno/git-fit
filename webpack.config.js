const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = {
    entry: "./public/src/app.js",
    output: {
      path: path.join(__dirname,"./public/dist"),
      filename: "bundle.js",
      publicPath: '/public/'
    },
    mode: "development",
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [new MiniCssExtractPlugin()],
    module: {
      rules: [
        {
            test: /\.css$/i,
            use: [
                {
                    loader:MiniCssExtractPlugin.loader,
                    options : {
                        publicPath: '/public/'
                    }
                },
                'css-loader',
            ],
        },
      ],
    },
  };
  module.exports = config;