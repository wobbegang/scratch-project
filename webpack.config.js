const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      { test: /\.css$/, use: ['css-loader'] },
      { test: /\.svg$/, use: ['svg-loader'] },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      //   filename: './index.html',
    }),
    // new CopyPlugin({
    //   patterns: [{ from: './src/style.css' }],
    // }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
  },
  devtool: 'eval-source-map',
};
