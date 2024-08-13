const path = require('path');
const SpinSdkPlugin = require("@fermyon/spin-sdk/plugins/webpack")
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    entry: './src/spin.ts',
    experiments: {
        outputModule: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'dist.js',
        module: true,
        library: {
            type: "module",
        }
    },
    plugins: [
        new SpinSdkPlugin(),
        new VueLoaderPlugin(),
    ],
    optimization: {
        minimize: false
    },
};