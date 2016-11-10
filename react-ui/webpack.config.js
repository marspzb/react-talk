const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pkg = require('./package.json');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    app: path.join(__dirname, 'src/application.jsx'),
    build: path.join(__dirname, 'build'),
    style: path.join(__dirname, 'src/main.css')
};
const ENV = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 9000
};

process.env.BABEL_ENV = TARGET;

const common = {
    entry: {
        app: PATHS.app
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'react': 'react-lite',
            'react-dom': 'react-lite'
        }

    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                // loaders: ['babel?cacheDirectory'],
                //include: PATHS.app
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            template: 'node_modules/html-webpack-template/index.ejs',
            title: 'React portfolio test',
            appMountId: 'app',
            inject: false
        })
    ]
};

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        entry: {
            style: PATHS.style
        },
        devtool: 'eval-source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,

            // display only errors to reduce the amount of output
            stats: 'errors-only',

            // parse host and port from env so this is easy
            // to customize
            host: ENV.host,
            port: ENV.port
        },
        module: {
            loaders: [
                // Define development specific CSS setup
                {
                    test: /\.css$/,
                    loaders: ['style', 'css'],
                    include: PATHS.style
                }
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

if (TARGET === 'build' || TARGET === 'stats') {
    module.exports = merge(common, {
        entry: {
            vendor: Object.keys(pkg.dependencies).filter(function (v) {
                // Exclude alt-utils as it won't work with this setup
                // due to the way the package has been designed
                // (no package.json main).
                return v !== 'alt-utils';
            }),
            style: PATHS.style
        },
        output: {
            path: PATHS.build,
            filename: '[name].[chunkhash].js',
            chunkFilename: '[chunkhash].js'
        },
        module: {
            loaders: [
                // Extract CSS during build
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style', 'css'),
                    include: PATHS.app
                }
            ]
        },
        plugins: [
            new CleanPlugin([PATHS.build]),
            // Output extracted CSS to a file
            new ExtractTextPlugin('styles.[chunkhash].css'),
            // Extract vendor and manifest files
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'manifest']
            }),
            // Setting DefinePlugin affects React library size!
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"'
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    });
}