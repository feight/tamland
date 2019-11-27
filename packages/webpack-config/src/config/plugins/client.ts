

import path from "path";

import AssetsPlugin from "assets-webpack-plugin";
import BrotliPlugin from "brotli-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ImageminWebpWebpackPlugin from "imagemin-webp-webpack-plugin";
import webpack, { Configuration } from "webpack";
import LoadablePlugin from "@loadable/webpack-plugin";


import { Options } from "../..";


export const client = function(
    options: Options,
    config: Configuration
): Configuration{

    const output = config.output ?? {};
    const folder = output.path ? path.relative(options.cwd, output.path) : options.outputPath;

    return {
        plugins: [
            new LoadablePlugin({
                filename: "loadable-stats.json",
                writeToDisk: true
            })
        ]
        .concat(options.watch && options.bundleAnalyzer ? [
            new BundleAnalyzerPlugin({
                analyzerHost: "127.0.0.1",
                analyzerMode: "server",
                analyzerPort: options.ports.bundleAnalyzer,
                defaultSizes: "parsed",
                generateStatsFile: false,
                logLevel: "info",
                openAnalyzer: false,
                reportFilename: "report.html",
                statsFilename: "stats.json",
                statsOptions: null
            })
        ] : [])
        .concat(options.watch ? [
            new webpack.NoEmitOnErrorsPlugin()
        ] : [
            // Don't show progress during the watch, it messes up the other output
            new webpack.ProgressPlugin({
                activeModules: false,
                entries: true,
                modules: true,
                modulesCount: 10000

            /*
             * Needed because the type definitions for this plugin don't match
             * the documentation
             */
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)
        ])
        .concat(options.optimizations.brotli ? [
            new BrotliPlugin({
                asset: "[path].br[query]",
                minRatio: 1,
                test: /\.(js|css|html|svg)$/gu,
                threshold: 0
            })
        ] : [])
        .concat(options.optimizations.gzip ? [
            new CompressionPlugin({
                algorithm: "gzip",
                filename: "[path].gz[query]",
                minRatio: 1,
                test: /\.(js|css|html|svg)$/gu,
                threshold: 0
            })
        ] : [])
        .concat(options.optimizations.webp ? [
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
            })
        ] : [])
        .concat([
            new AssetsPlugin({
                filename: "webpack-assets.json",
                path: folder
            })
        ])
    };

};
