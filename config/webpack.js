require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const MiniCssPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { default: CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const root = path.resolve(__dirname, '..');
const env = process.env.NODE_ENV;

const options = {
  mode: env,
  entry: {
    app: root + '/src/main.js',
  },
  output: {
    path: root + '/dist',
    publicPath: '/',
    filename: 'js/[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules',
        loader: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': [
              MiniCssPlugin.loader,
              'css-loader',
              'sass-loader',
            ],
            'sass': [
              MiniCssPlugin.loader,
              'css-loader',
              'sass-loader?indentedSyntax',
            ],
          },
        },
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        },
      }
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
      new OptimizeCssPlugin({
        cssProcessorPluginOptions: {
          preset: ['default',  {discardComments: {removeAll: true}}],
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [`${root}/dist`],
    }),
    new MiniCssPlugin({filename: 'css/[name].[hash:8].css'}),
    new HtmlPlugin({
      inject: true,
      template: `${root}/index.html`,
      env: process.env.NODE_ENV,
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/assets'),
        to: 'assets',
        ignore: ['.*'],
      },
    ]),
    // new BundleAnalyzerPlugin(), Only used this in local for bundle size investigation purpose
    new VueLoaderPlugin(),
  ],
  resolve: {
    alias: {'vue$' : 'vue/dist/vue.esm.js'},
    extensions: ['*','.js', '.vue', '.json'],
  },
};

module.exports = options;