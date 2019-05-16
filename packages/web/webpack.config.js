// webpack.config.js
const webpack = require("webpack");
const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const entryPath = () => {
    return path.resolve( __dirname, "lib/index.js");
};

const output_cjs = () => {
    return {
        path: path.resolve( __dirname, "dist/" ),
        filename: "index.cjs.js",
        libraryTarget: "commonjs2",
        libraryExport: 'default',
    }
}

const output_umd = () => {
    return {
        path: path.resolve( __dirname, "dist/" ),
        filename: "index.umd.js",
        libraryTarget: "umd",
        globalObject: "this"
    }
}

// const externals_opts = () => {
//     return {
//         lodash: {
//             commonjs: "lodash",
//             commonjs2: "lodash",
//             amd: "lodash",
//             umd: "lodash",
//             root: "_"
//         },
//         fs: {
//             commonjs: "fs",
//             commonjs2: "fs",
//             amd: "fs",
//             umd: "fs"
//         }
//     }
// }

const moduleObj = () => {
    return {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options:{
                            exclude: /node_modules/,
                            presets: ["@babel/preset-env"]
                        }
                    }
                ]
            }
        ]
    };
};

const optimizationConf = () => {
    return {
        minimizer: [new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
                ecma: 8,
                compress: {
                    warnings: false,
                }
            },
        })],
    }
};


pack = (outputSpec) => {
    return {
        mode: "production",
        entry: entryPath(),
        output: outputSpec,
        module: moduleObj(),
        // optimization: optimizationConf(),
    }
};

// devServer = () => {
//     return {
//         devServer: {
//             contentBase: path.join(__dirname, 'lib'),
//             compress: true,
//             port: 9000
//           }
//     }
// };

module.exports = [
    // pack( output_cjs() ),
    pack( output_umd() ),
    // devServer(),
]