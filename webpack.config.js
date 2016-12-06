var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

var stylesGeneral = 'src/styles/general/styles.scss';
var stylesSpecyfic = 'src/styles/general/brand-specyfic.scss';

var extractCSS = new ExtractTextPlugin('stylesheets/styles.css');
var extractCSSBrandSpecyfic = new ExtractTextPlugin('stylesheets/brand-specyfic.css');
var indexFileConfig = () => {
    return new HtmlWebpackPlugin({
        filename: `index.html`,
        hash: false,
        inject: 'body',
        template: `./src/${pageName}.jade`
    })
}

var pageName = process.env.PAGE_NAME || '';
var createIndexFile = process.env.BUILD ? false : indexFileConfig(); 

var defaultConfig = {
    context: __dirname,
    resolve: {
        root: path.join(__dirname, '/src/')
    },
}

var commonConfig = {
    module: {
        loaders: [
            { test: /\.scss$/,
              include: path.resolve('src/styles/general/styles.scss'),
              loader: extractCSS.extract(['css','sass']) },
            { test: /\.scss$/,
              include: path.resolve('src/styles/general/brand-specyfic.scss'),
              loader: extractCSSBrandSpecyfic.extract(['css','sass']) },
            { test: /\.jade$/, loader: 'jade' }
        ]
    }
}

var clientConfigJS = {
    //devtool: "source-map",
    target: 'web',
    entry: {
        'entry.js': ['./src/entry.js', path.resolve(stylesGeneral), path.resolve(stylesSpecyfic)]
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'js/[name]'
    },
    node: {
        global: true,
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: false
    },
    plugins: [
      extractCSS,
      extractCSSBrandSpecyfic,
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(pageName)
      }),
      new HtmlWebpackPlugin({
        filename: `${pageName}.html`,
        hash: false,
        inject: 'body',
        template: `./src/${pageName}.jade`
      }),
      createIndexFile
    ].filter((plugin) => { return plugin !== false})
};

var webpackMerge = require('webpack-merge');

module.exports = [

    webpackMerge({}, defaultConfig, commonConfig, clientConfigJS)

];