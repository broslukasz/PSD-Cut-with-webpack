let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let webpack = require('webpack');

let stylesGeneral = 'src/styles/general/styles.scss';
let stylesSpecyfic = 'src/styles/general/brand-specyfic.scss';
let stylesBootstrap = 'src/styles/general/common/lib/bootstrap.scss';
let stylesFontAwesome = 'src/styles/general/common/lib/font-awesome.scss';

let extractCSS = new ExtractTextPlugin('stylesheets/styles.css');
let extractCSSBrandSpecyfic = new ExtractTextPlugin('stylesheets/brand-specyfic.css');
let extractCSSBootstrap = new ExtractTextPlugin('stylesheets/bootstrap.css');
let extractCSSFontAwsome = new ExtractTextPlugin('stylesheets/font-awsome.css');


let pageName = process.env.PAGES || '';

let pluginForIndex = new HtmlWebpackPlugin({
                    filename: `index.html`,
                    hash: false,
                    inject: 'body',
                    template: `./src/templates/${pageName}.jade`
                })

let createIndexFile = process.env.BUILD ? false : pluginForIndex; 

let pages = process.env.PAGES.split(',')

let allPlugins = [
      extractCSSBootstrap,
      extractCSSFontAwsome,
      extractCSS,
      extractCSSBrandSpecyfic,
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(pageName)
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      }),
      createIndexFile
]

let buildFiles = (page) => {
    return new HtmlWebpackPlugin({
        filename: `${page}.html`,
        hash: false,
        inject: 'body',
        template: `./src/templates/${page}.jade`
    })
}

let buildAll = () => {
    pages.forEach((page) => {
        allPlugins.push(buildFiles(page))
    });
}

buildAll();

let defaultConfig = {
    context: __dirname,
    resolve: {
        root: path.join(__dirname, '/src/')
    },
}

let commonConfig = {
    module: {
        loaders: [
            { test: /\.scss$/,
              include: path.resolve('src/styles/general/common/lib/bootstrap.scss'),
              loader: extractCSSBootstrap.extract(['css','sass']) },
            { test: /\.scss$/,
              include: path.resolve('src/styles/general/common/lib/font-awesome.scss'),
              loader: extractCSSFontAwsome.extract(['css','sass']) },
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

let clientConfigJS = {
    //devtool: "source-map",
    target: 'web',
    entry: {
        'entry.js': ['./src/entry.js',
                    path.resolve(stylesBootstrap),
                    path.resolve(stylesFontAwesome),
                    path.resolve(stylesGeneral),
                    path.resolve(stylesSpecyfic)]
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
    plugins: allPlugins.filter((plugin) => { return plugin !== false})
};

let webpackMerge = require('webpack-merge');

module.exports = [

    webpackMerge({}, defaultConfig, commonConfig, clientConfigJS)

];