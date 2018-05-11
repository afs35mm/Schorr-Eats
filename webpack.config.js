const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, options) => {
    const isProduction = options.mode === 'production';
    return {
        module : {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [{
                            loader: 'css-loader',
                            options: {
                                minimize: isProduction,
                            }
                        }, {
                            loader: 'sass-loader',
                        }],
                    })
                }
            ],

        },
        plugins: [
            new ExtractTextPlugin(
                {
                    filename: 'style.css'
                }
            ),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                Tether: 'tether'
              })
        ],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.js',
        },
        entry: {
            main: './src/js/index.js'
        }
    }
};

