const path = require('path');
const SpinSdkPlugin = require("@fermyon/spin-sdk/plugins/webpack")
const { VueLoaderPlugin } = require('vue-loader');
const { devtools } = require('vue');

module.exports = {
    target: ["webworker"],
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
        chunkFormat: 'commonjs',
        filename: 'dist.js',
        module: true,
        library: {
            type: "module",
        },
        environment: {
            globalThis: false
        },
    },
    plugins: [
        new SpinSdkPlugin(),
        new VueLoaderPlugin(),
    ],
    optimization: {
        minimize: false
    },
};