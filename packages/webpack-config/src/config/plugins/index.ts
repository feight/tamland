

import DuplicatePackageCheckerPlugin from "duplicate-package-checker-webpack-plugin";
import merge from "webpack-merge";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";

import { client } from "./client";
import { server } from "./server";

import { Options } from "../..";


export default function configuration(
    options: Options,
    config: webpack.Configuration
): webpack.Configuration{

    const hash =
        options.mode !== "development" ||
        options.watch !== true;

    const define: {
        [key: string]: string;
    } = {
        "process.env.hostname": JSON.stringify(options.hostname),
        "process.env.mode": JSON.stringify(options.mode),
        "process.env.target": JSON.stringify(options.target),
        // Bug in the linter
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        "process.env.watch": JSON.stringify(options.watch)
    };

    if(options.watch){
        define["process.env.devServerPort"] = JSON.stringify(options.ports.devServer);
    }

    const base: webpack.Configuration = {
        plugins: [
            // Set NODE_ENV based on the provided Webpack environment.
            new webpack.DefinePlugin(define),
            new DuplicatePackageCheckerPlugin(),
            new MiniCssExtractPlugin({
                chunkFilename: hash ? "[chunkhash].css" : "[id].css",
                filename: hash ? "[chunkhash].css" : "[name].css"
            })
        ]
    };

    return merge(
        base,
        options.target === "client" ? client(options, config) : server()
    );

}
