const path = require('path');
const webpack = require('webpack')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => ({
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'public'),
    chunkFilename: "[name].js",
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        }
      },
    ]
  },
  resolve: {
    alias: {
        components: path.resolve(__dirname, 'src/components'),
        shared: path.resolve(__dirname, 'src/shared'),
        helpers: path.resolve(__dirname, 'src/helpers'),
        icons: path.resolve(__dirname, 'src/icons'),
        app: path.resolve(__dirname, 'src/app'),
        assets: path.resolve(__dirname,'src/assets')
    },
    extensions: ['.js']
  },
  plugins : [ 
    new BundleAnalyzerPlugin(),
    new webpack.ContextReplacementPlugin(
      /highlight\.js\/lib\/languages$/,
      new RegExp(`^./(${['bash', 'css', 'javascript', 'json', 'java', 'go', 'php','plaintext'].join('|')})$`)
    ),
  ],
  devtool: argv.mode === 'production' ? '' : 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public')
  }
});