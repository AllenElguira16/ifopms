import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
// import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";
// import ErrorOverlayPlugin from "error-overlay-webpack-plugin";
import WebpackNotifier from "webpack-notifier";
// import { CheckerPlugin } from "awesome-typescript-loader";
var isProd = process.env.NODE_ENV.trim() === 'production';

export default {
  performance: {
    hints: false
  },
  watch: isProd ? false : true,
  entry: {
    main: ["./Assets/Scripts/Web/index.tsx"],
    dashboard: ["./Assets/Scripts/Dashboard/index.tsx"],
    vendor: ["react", "react-dom", "react-router-dom"]
  },
  output: {
    path: path.resolve(__dirname, "Public/Scripts"),
    filename: "[name].bundle.js",
    chunkFilename: '[name].bundle.js'   
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.jsx', '.js', '.json', '.vue']
  },
  // optimization: {
  //   minimizer: [
  //     new OptimizeCssAssetsPlugin(),
  //     new UglifyJsPlugin({
  //       cache: isProd ? true : false,
  //       parallel: true,
  //       uglifyOptions: {
  //         compress: {
  //           warnings: false, // Suppress uglification warnings
  //           pure_getters: true,
  //           unsafe: true,
  //           unsafe_comps: true,
  //         },
  //         ecma: 6,
  //         mangle: true
  //       },
  //       sourceMap: true
  //     })
  //   ],
  // },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          // isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.css$/,
        use: [
          // isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
      },
      {
        test: /\.(jpe?g|png|gif)/,
        loader: 'url-loader',
      },
      {
        test: /\.(zip|rar)/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    // new CheckerPlugin(),
    // new ErrorOverlayPlugin(),
    new WebpackNotifier({
      title: "Webpack",
      alwaysNotify: true,
    }),
    new MiniCssExtractPlugin({
      filename: "../Styles/[name].bundle.css",
      
    }),
    // new webpack.optimize.AggressiveMergingPlugin({
    //   minSize: 10000,
    //   maxSize: 30000
    // }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ],
  // devtool: 'source-map',
  // node: {
  //   fs: "empty"
  // }
}