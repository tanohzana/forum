const webpack = require('webpack');
const path = require('path');

// variables
const isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';
const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './build');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

module.exports = {
  context: sourcePath,
  entry: {
    app: './index.jsx',
  },
  output: {
    path: outPath,
    filename: 'bundle.js',
    chunkFilename: '[chunkhash].js',
    publicPath: isProduction ? '' : '/',
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        use: [
          !isProduction && {
            loader: 'babel-loader',
            options: { cacheDirectory: true, plugins: ['react-hot-loader/babel'] },
          },
          'babel-loader',
        ].filter(Boolean),
      },
      {
        test: /^((?!\.global).)*(s)?css$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /(s)?css$/,
        include: [/node_modules/],
        use: [{ loader: 'style-loader' }, { loader: 'css-loader', options: { modules: false } }],
      },
      {
        test: /.global.(s)?css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
      },
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.(a?png|svg)$/, use: 'url-loader' },
      { test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/, use: 'file-loader' },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10,
        },
      },
    },
    runtimeChunk: true,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false,
    }),
    new WebpackCleanupPlugin(),
    new MiniCssExtractPlugin({
      filename: '[contenthash].css',
      disable: !isProduction,
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: './resources/favicon.ico',
    }),
  ],
  devServer: {
    contentBase: sourcePath,
    hot: true,
    inline: true,
    historyApiFallback: true,
    stats: 'minimal',
    clientLogLevel: 'warning',
  },
  devtool: isProduction ? 'hidden-source-map' : 'cheap-module-eval-source-map',
};
