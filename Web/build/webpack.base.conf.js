var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
var PrerenderSpaPlugin = require('prerender-spa-plugin')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

let originalConfig = {
    entry: {
        app: './src/main.js',
        vendor: ['vue','vuex','axios','vue-router','moment']
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            '/components': resolve('src/components'),
            '/views': resolve('src/views'),
            '/assets': resolve('src/assets'),
            '/utils': resolve('src/utils'),
            '/config': resolve('src/config')
        }
    },
    module: {
        rules: [{
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            include: [resolve('src'), resolve('test')],
            options: {
                formatter: require('eslint-friendly-formatter')
            }
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueLoaderConfig
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src'), resolve('test')]
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
        },
        {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('media/[name].[hash:7].[ext]')
            }
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 150000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }]
    }
}

const vuxLoader = require('vux-loader')
const webpackConfig = originalConfig
module.exports = vuxLoader.merge(webpackConfig, {
  options: {},
  plugins: [
      'vux-ui', 
      'progress-bar', 
      'duplicate-style',
      new PrerenderSpaPlugin(
        path.join(__dirname, '../dist'),
        ['/home']
      )
    ]
})
