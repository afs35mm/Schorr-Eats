const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, options) => {
    const isProduction = options.mode === 'production';
    return {
        devtool: 'inline-cheap-source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    minimize: isProduction,
                                },
                            },
                            {
                                loader: 'sass-loader',
                            },
                        ],
                    }),
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    minimize: isProduction,
                                },
                            },
                        ],
                    }),
                },
            ],
        },
        plugins: [
            new ExtractTextPlugin({
                filename: 'style.css',
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
            }),
        ],
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'index.js',
        },
        entry: {
            main: './src/js/index.js',
        },
    };
};
