const path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    bundle: [
      './client',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    ],
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'superagent',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].js',
    chunkFilename: 'chunk.[name].js',
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-0', 'react-hmre'],
        plugins: ['transform-runtime', 'add-module-exports'],
        cacheDirectory: true,
      },
    }, {
      test: /\.scss$/,
      loaders: [
        'style-loader',
        'css-loader?modules&camelCase&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:8]',
        'sass-loader',
      ],
    }, {
      test: /\.(jpg|png|gif|webp)$/,
      loader: 'url-loader?limit=8000',
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.html$/,
      loader: 'html-loader?minimize=false',
    }],
  },
  resolve: {extensions: ['.js', '.json', '.scss', '.ts', '.tsx']},
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      filename: '[name].js',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
    new HtmlWebpackPlugin({
      filename: '../views/dev/index.html',
      template: './views/tpl/index.tpl.html',
    }),
    new ProgressBarPlugin({summary: false}),
  ],
};

