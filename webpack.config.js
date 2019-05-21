const path = require('path');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const dotenv = require('dotenv-safe');

module.exports = (env, argv) => {
  dotenv.config();

  const isProduction = argv && argv.mode && argv.mode === 'production';
  const serverPort = process.env.PORT_HTTP || 3001;
  const serverHost = process.env.APP_HOST || 'localhost';

  return {
    entry: ["@babel/polyfill", "./client/main.js"],
    output: {
      filename: isProduction ? '[name].[chunkhash].js' : '[name].[hash].js',
      chunkFilename: isProduction ? 'vendor.[chunkhash].js' : 'vendor.[hash].js',
      path: `${__dirname}/dist`,
    },
    resolve: {
      extensions: [ '.js', '.vue' ],
      alias: {
          'vue$': isProduction ? 'vue/dist/vue.runtime.min.js' : 'vue/dist/vue.runtime.js',
          '@': `${__dirname}/client`,
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          }
        },
        {
          test: /\.(scss|css)$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            // 'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => {
                  const plugins = [autoprefixer()];

                  if (isProduction) plugins.push(cssnano());

                  return plugins;
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          type: 'javascript/auto',
          test: /\.json$/,
          loader: 'json-loader',
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=100000',
        },
      ]
    },
    devtool: 'source-map',
    watch: true,
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlPlugin({ template: './client/index.html' }),
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: isProduction ? '[name].[hash].css' : '[name].css',
        chunkFilename: isProduction ? '[id].[hash].css' : '[id].css',
      }),
      new CopyWebpackPlugin([
        {
          from: './client/assets/',
          to: 'dist/client/assets',
        },
      ]),
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
      ],
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            enforce: true,
          },
        },
      },
    },
    devServer: {
      port: 3000,
      historyApiFallback: true,
      open: true,
      hot: true,
      proxy: {
        '/api': `http://${serverHost}:${serverPort}`,
      },
      publicPath: '/',
      watchOptions: { aggregateTimeout: 300, poll: 1000 },
    },
  };
};
