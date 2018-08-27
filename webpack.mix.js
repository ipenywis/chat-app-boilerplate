let mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

//.options({ imgLoaderOptions: { enabled: false } })

mix.setPublicPath("./dist");

mix.js("src/app.js", "dist/").sass("resources/sass/app.scss", "dist/");

//This Solves the emitting Stuck at 95% mix.setPublicPath("./dist");

let path = require("path");

let webpack = require("webpack");

// new webpack.ProvidePlugin({ $: "jQuery", jQuery: "jQuery" }); let
// ExtractTextPlugin = require("extract-text-webpack-plugin"); External let
// nodeExternals = require("webpack-node-externals"); externals: ["ws",
// "electron"],

mix.webpackConfig(
  (module.exports = {
    target: "node",
    watch: true,
    externals: [
      (function() {
        var IGNORES = ["ws", "electron"];
        return function(context, request, callback) {
          if (IGNORES.indexOf(request) >= 0) {
            return callback(null, "require('" + request + "')");
          }
          return callback();
        };
      })()
    ],
    module: {
      loaders: [
        {
          test: /.jsx?$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          query: {
            presets: ["es2015", "react"],
            plugins: ["transform-class-properties"]
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader"
            },
            {
              loader: "resolve-url-loader"
            }
          ]
        },
        {
          test: /\.(scss|sass)$/,
          loaders: [
            "style-loader",
            "css-loader",
            "resolve-url-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          //loader: 'file?name=/dist/fonts/[name].[ext]'
          loader: "resolve-url-loader"
        }
        /*{
                                                                                  test: /\.(woff|woff2)$/,
                                                                                  use: {
                                                                                      loader: "file-loader",
                                                                                      options: {
                                                                                          name: "./dist/fonts/[hash].[ext]",
                                                                                          limit: 5000,
                                                                                          mimetype: "application/font-woff"
                                                                                      }
                                                                                  }
                                                                              },
                                                                              {
                                                                                  test: /\.(ttf|eot|svg)$/,
                                                                                  use: {
                                                                                      loader: "file-loader",
                                                                                      options: {
                                                                                          name: "fonts/[hash].[ext]"
                                                                                      }
                                                                                  }
                                                                              }*/
      ]
    }
  })
);
