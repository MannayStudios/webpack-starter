const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getEntries } = require('./utils.js');

const entries = getEntries('./src/pages/', 'js');

const config = {
  entry: Object.assign(entries, { app: './src/app.js' }),
  output: {
    pathinfo: false,
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].chunk.[chunkhash:8].js',
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'assets/[name].[md5:hash:hex:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|otf|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'fonts/[name].[md5:hash:hex:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(mp4|ogg|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[md5:hash:hex:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  parallelism: 8,
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
        },
        vendors: {
          chunks: 'initial',
          name: 'vendors',
          test: /node_modules\//,
          minChunks: 5,
          priority: 10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [],
};

const pages = getEntries('./src/pages/', 'html');

for (const pathname in pages) {
  // Configured to generate the html file, define paths, etc.
  const conf = {
    filename: `${pathname}.html`, // html output pathname
    template: path.resolve(__dirname, `.${pages[pathname]}`), // Template path
    inject: true,
    favicon: path.resolve(__dirname, '../src/assets/favicon.ico'),
    chunks: ['commons', 'vendors', 'app', pathname],
    chunksSortMode: 'manual',
  };
  config.plugins.push(new HtmlWebpackPlugin(conf));
}

module.exports = config;
