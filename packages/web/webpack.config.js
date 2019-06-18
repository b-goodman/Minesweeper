// webpack.config.js
const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: "production",
    // entry: {
    //     filename: "./src/index.ts",
    //     vendor: ["phaser"],
    // },
    entry:{
        vendor: ["phaser"],
        app:[
            path.resolve( __dirname, "src/index.ts")
        ]
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "js/[name].bundle.js",
        publicPath: "./"
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     type: "javascript/auto",
            //     exclude: /node_modules/
            // },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: [/\.vert$/, /\.frag$/, /phaser-split\.js$/,],
                use: "raw-loader"
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        lazy: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            "CANVAS_RENDERER": JSON.stringify(true),
            "WEBGL_RENDERER": JSON.stringify(true)
        }),
        new CopyPlugin([
            {from: "assets", to: "assets"}
        ]),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            chunks: ["vendor", "app"],
            chunksSortMode: "manual",
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                html5: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
                removeComments: true,
                removeEmptyAttributes: true
            },
            hash: true
        }),
    ],
    resolve: {
        extensions: [ ".tsx", ".ts", ".js" ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                output: {
                    comments: false
                }
                }
            })
        ],
        runtimeChunk: false,
        splitChunks: {
            cacheGroups: {
                default: false,
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all",
                    minChunks: 2
                }
            }
        }
    }
}