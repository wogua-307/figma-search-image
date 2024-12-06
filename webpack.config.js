const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const path = require('path')
const webpack = require('webpack') // 引入 webpack
const manifest = require('./manifest.json')

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    ui: './src/app/index.tsx', // The entry point for your UI code
    code: './src/plugin/controller.ts' // The entry point for your plugin code
  },

  module: {
    rules: [
      // Converts TypeScript code to JavaScript
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }

      // Enables including CSS by doing "import './file.css'" in your TypeScript code
      // { test: /\.css$/, use: ['style-loader', { loader: 'css-loader' }] },

      // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
      // { test: /\.(png|jpg|gif|webp|svg)$/, loader: 'url-loader' }
    ]
  },

  // Webpack tries these extensions for you if you omit the extension like "import './file'"
  resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },

  output: {
    publicPath: 'auto', // 关键设置，使内联插件可以找到文件
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist') // Compile into a folder called "dist"
  },

  // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'ui.html',
      chunks: ['ui'],
      inject: 'body', //  确保脚本注入到 body 中
      cache: false
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui/]), // 复制ui.js代码到ui.html
    //  新增 DefinePlugin
    new webpack.DefinePlugin({
      'process.env.PLUGIN_VERSION': JSON.stringify(manifest.api),
      'process.env.ENV': JSON.stringify(argv.mode === 'production' ? 'pro' : 'dev')
    })
  ]
})
