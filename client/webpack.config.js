const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin',
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      
      new WebpackPwaManifest({
        fingerprints: false, //applicatin verification
        inject: true,
        name: 'JATE - Text Editor Notes',
        short_name:'JATE',
        description:'Save your coding text snippets',
        background_color: '#008080',
        theme_color:'#008080',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          }
        ]
      })
    ],

    module: {
      rules: [
        {
          test:/\.css$/i,
          use:['style-loader','css-loader'],
        },
        {
          test:/\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader:"babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'] //object rest spread should be included in preset-env. but the transfrom runtime is to allow babel to reuse its helpers info here -> https://babeljs.io/docs/en/babel-plugin-transform-runtime
            }
          }
        },
      ],
    },
  };
};
