

import path from "path";

import AssetsPlugin from "assets-webpack-plugin";
import BrotliPlugin from "brotli-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ImageminWebpWebpackPlugin from "imagemin-webp-webpack-plugin";
import webpack, { Configuration } from "webpack";
import LoadablePlugin from "@loadable/webpack-plugin";


import { Options } from "../..";


export const client = function(
    config: Configuration,
    options: Options
): Configuration{

    const output = config.output || {};
    const folder = output.path ? path.relative(options.cwd, output.path) : "dist";

    return {
        plugins: [
            new BrotliPlugin({
                asset: "[path].br[query]",
                minRatio: 0.8,
                test: /\.(js|css|html|svg)$/gu,
                threshold: 10240
            }),
            new ImageminWebpWebpackPlugin({
                config: [{
                    options: {
                        quality: 75
                    },
                    test: /\.(jpe?g|png)/gu
                }],
                detailedLogs: false,
                overrideExtension: false,
                silent: false,
                strict: true
            }),
            new LoadablePlugin({
                filename: "loadable-stats.json",
                writeToDisk: true
            }),
            new AssetsPlugin({
                filename: "webpack-assets.json",
                path: folder
            }),
            new BundleAnalyzerPlugin({
                analyzerHost: "127.0.0.1",
                analyzerMode: "server",
                analyzerPort: options.bundleAnalyzerPort,
                defaultSizes: "parsed",
                generateStatsFile: false,
                logLevel: "info",
                openAnalyzer: false,
                reportFilename: "report.html",
                statsFilename: "stats.json",
                statsOptions: null
            })
        ].concat(options.watch ? [
            new webpack.NoEmitOnErrorsPlugin()
        ] : [])
    };

};
