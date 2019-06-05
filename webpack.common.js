// MDEV Digital - Webpack Boilerplate[Pug + SCSS]
// Webpack 4 Configuration file
// -----------------------------------------
// Common Webpack Rules
// ----------------------------------------

// Required Imports
const path = require('path')
const webpack = require('webpack')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require ('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const setPath = function(folderName) {
  return path.join(__dirname, folderName);
}

// Module Exports
module.exports = {
  // Asset Splitting [ Vendor | Build ]
  entry: {
    build: './index.js'
  },
  // Output Files
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'app/[name][hash].js'
  },
  // Split Vendor | Build Assets into separate chunks
  optimization:{
    runtimeChunk: false,
    splitChunks: {
      chunks: "all", //Taken from https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
      // Cache groups to separate SCSS
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(sa|sc|c)ss$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  // Find Node Modules
  resolveLoader: {
    modules: [setPath('/node_modules')]
  },
  // Module Rules & Loaders
  module: {
    rules: [
      {
        test: /\.pug$/,
        // pretty is used to prevent minification of .pug templates
        use: [
          {loader: 'html-loader'},
          {
            // Change pretty to false to minify HTML output
            loader: 'pug-html-loader?pretty=true',
            options: {
              pretty: true,

              // Passes require to the Pug template handler
              data : {
                require: require
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
          exclude: /(node_modules)/,
          use: [{
            loader: "babel-loader",
            options: { presets: ['env'] }
          }]
      },
      // Mini-Css-Extract-Plugin - Pulls SCSS/CSS into file
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      // Image Processing
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loaders: [ 'file-loader?context=assets/images&name=assets/images/[path][name].[ext]', {
          loader: 'image-webpack-loader',
          query: {
            // JPEG Processing
            mozjpeg: {
              progressive: true,
              quality: 90
            },
            // GIF Processing
            gifsicle: {
              interlaced: false,
              optimizationLevel: 2
            },
            // PNG Processing
            pngquant: {
              quality: '75-80',
              speed: 2
            },
            // SVG Processing
            svgo: {
              plugins: [
                {
                  removeViewBox: false
                },
                {
                  removeEmptyAttrs: false
                }
              ]
            }
          }
        }]
      },
      // Font Processing
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  // Plugins & Post Processing
  plugins: [
    // Text Extraction & Chunking
    new MiniCssExtractPlugin({
      filename: "assets/styles/styles-[hash].css"
    }),
    // [ PUG + SASS Template Registration ]
    // -----------------------------------
    // Webpack needs to know which main templates to compile.
    // For every template you want to compile you must create a new
    // instance of the HtmlWebpackPlugin (https://github.com/jantimon/html-webpack-plugin)
    // and pass the "template" parameter.
    //
    // -----------------------------------
    //
    // new HtmlWebpackPlugin({
    //   template: './path/to/template.pug',
    //   filename: 'desired/path/to/output.html'
    // }),
    //
    // -----------------------------------
    //
    // If you pass a "filename" property you can assign a name and location
    // for the processed file to be placed. Otherwise it will save it to the root with the same name
    //
    // IE: filename:'./shared/footer.html' will output the template as dist/shared/footer.html
    //
    // TODO - Add new slugs here for the pages being created.
    new HtmlWebpackPlugin({
      template: './src/templates/index.pug'
    }),
    new CopyWebpackPlugin([
      { from: 'src/js', to: 'js', force: true }
    ])
  ],
  performance: {
    hints: 'warning'
  }
}
