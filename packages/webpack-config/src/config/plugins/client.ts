

import path from "path";

import AssetsPlugin from "assets-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import webpack, { Configuration } from "webpack";
import LoadablePlugin from "@loadable/webpack-plugin";
import { InjectManifest } from "workbox-webpack-plugin";


import { Options } from "../..";


export default function configuration(
    config: Configuration,
    options: Options
): Configuration{

    const output = config.output || {};
    const folder = output.path ? path.relative(process.cwd(), output.path) : "dist";

    return {
        plugins: [
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
            }),
            new InjectManifest({
                importWorkboxFrom: "local",
                swDest: "service-worker.js",
                swSrc: "service-worker.ts"
            })
        ].concat(options.watch ? [
            new webpack.NoEmitOnErrorsPlugin()
        ] : [])
    };

}
