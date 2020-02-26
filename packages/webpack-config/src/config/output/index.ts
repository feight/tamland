

import path from "path";

import { Configuration } from "webpack";

import { Options } from "../..";


export default function configuration(
    options: Options
): Configuration{

    const hash =
        options.target === "client" &&
        options.mode === "production" &&
        !options.watch;

    return {
        output: {
            chunkFilename: hash ? "[chunkhash].js" : "[id].js",
            filename: hash ? "[chunkhash].js" : "[name].js",
            hashSalt: "salt",
            path: path.join(options.cwd, options.outputPath, options.targetPath),
            publicPath: `/${ options.staticFolder }/`
        }
    };

}
