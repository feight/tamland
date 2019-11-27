

import path from "path";

import { Configuration } from "webpack";

import { Options } from "../..";


/*
 * Chooses a style of source mapping to enhance the debugging process. These
 * values can affect build and rebuild speed dramatically.
 *
 * https://webpack.js.org/configuration/devtool/
 */
export default function configuration(
    options: Options
): Configuration{

    const client = {
        devServer: {
            contentBase: path.join(options.cwd, options.outputPath, options.targetPath),
            hot: true,
            port: options.ports.devServer,
            publicPath: "/",
            stats: {
                builtAt: false,
                colors: true,
                entrypoints: false,
                hash: false,
                modules: false,
                timings: false,
                version: false
            },
            watchOptions: {
                poll: true
            },
            writeToDisk: true
        }
    };

    return options.target === "client" ? client : {};

}
