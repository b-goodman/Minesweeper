// webpack.config.js
const webpack = require("webpack");
const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: "production",
    entry: {
        filename: "./src/index.ts"
    },
    output: {
        filename: "index.js"
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                type: "javascript/auto",
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
}

// const moduleObj = () => {
//     return {
//         rules: [
//             {
//                 test: /\.js$/,
//                 use: [
//                     {
//                         loader: "babel-loader",
//                         options:{
//                             exclude: /node_modules/,
//                             presets: ["@babel/preset-env"]
//                         }
//                     }
//                 ]
//             }
//         ]
//     };
// };

// const optimizationConf = () => {
//     return {
//         minimizer: [new UglifyJsPlugin({
//             cache: true,
//             parallel: true,
//             uglifyOptions: {
//                 ecma: 8,
//                 compress: {
//                     warnings: false,
//                 }
//             },
//         })],
//     }
// };


// pack = (outputSpec) => {
//     return {
//         mode: "production",
//         // mode: "development",
//         entry: entryPath(),
//         output: outputSpec,
//         module: moduleObj(),
//         // optimization: optimizationConf(),
//     }
// };

// devServer = () => {
//     return {
//         devServer: {
//             contentBase: path.join(__dirname, 'lib'),
//             compress: true,
//             port: 9000
//           }
//     }
// };

// module.exports = [
//     // pack( output_cjs() ),
//     pack( output_umd() ),
//     // devServer(),
// ]