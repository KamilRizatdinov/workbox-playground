const path = require('path');
const {DefinePlugin} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {InjectManifest} = require('workbox-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

const cwd = process.cwd();
const {version} = require(path.resolve(cwd, './package.json'));

module.exports = {
  context: process.cwd(),
  target: 'web',
  resolve: {
    extensions: ['.jsx', '.js'],
    fallback: {
      dgram: false,
      fs: false,
      net: false,
      tls: false,
      child_process: false,
    },
  },
  entry: {
    client: [path.resolve(cwd, './src/client/index.js')],
  },
  node: {
    global: false,
  },
  mode: 'production',
  devtool: 'source-map',
  performance: false,

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(cwd, './src'),
        ],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    new LoadablePlugin({
      filename: '../loadable-stats.json',
      writeToDisk: true,
    }),
    new DefinePlugin({
      'process.env.VERSION': version,
    }),
    new CopyPlugin({
      patterns: [
        {from: './src/public', globOptions: {ignore: ['**/*.html']}},
      ],
    }),
    new HtmlWebpackPlugin({template: path.resolve(cwd, './src/public/index.html')}),
    new InjectManifest({
      swSrc: path.resolve(cwd, './src/public/service-worker.js'),
      swDest: path.resolve(cwd, "./build/public/sw.js"),
      additionalManifestEntries: [{url: '/', revision: version}],
      include: [
        /\.js$/,
        /\.map$/,
      ],
      exclude: [/\.html$/],
    }),
  ],

  output: {
    filename: 'static/js/[name].[hash].js',
    chunkFilename: 'static/js/[name].[chunkhash].chunk.js',
    path: path.resolve(cwd, './build/public'),
    publicPath: '/',
  },
}
