/**
 * Webpack configuration in Typescript Language
 * 
 * This ensures you to config your webpack settings without any unknown errors 
 */
import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

/**
 * Node Env constants
 * 
 * 
 */


/**
 * Webpack configuration
 */
const serverConfig: webpack.Configuration = {
  mode: 'development',
  watch: true,
  entry: {
    app: './public/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      "@App": path.resolve(__dirname, "app"),
      "@Controllers": path.resolve(__dirname, "app/http/controllers"),
      "@Middlewares": path.resolve(__dirname, "app/http/middlewares"),
      "@Models": path.resolve(__dirname, "app/http/models"),
      "@Routes": path.resolve(__dirname, "app/routes"),
      "@Interfaces": path.resolve(__dirname, "interfaces")
    }
  }
};

const clientConfig: webpack.Configuration = {
  mode: 'development',
  watch: true,
  entry: './client/index.tsx',
  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: '[name].bundle.js'
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /.tsx$/,
        use: 'awesome-typescript-loader'
      },
      {
        test: /.(sass|scss|css)$/,
        use: [
          "style-loader", "css-loader", "sass-loader"
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss', '.sass', '.css']
  }
};

export default [serverConfig, clientConfig];