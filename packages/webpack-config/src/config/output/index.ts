

import path from "path";

import { Configuration } from "webpack";

import { Options } from "../..";


export default function configuration(
    config: Configuration,
    options: Options
): Configuration{

    const hash =
        options.target === "client" &&
        options.mode === "production" &&
        options.watch === false;

    return {
        output: {
            chunkFilename: hash ? `[chunkhash:${ options.hashLength }].js` : "[id].js",
            filename: hash ? `[chunkhash:${ options.hashLength }].js` : "[name].js",
            hashSalt: "salt",
            path: path.join(process.cwd(), `dist/${ options.target }`),
            publicPath: `/${ options.staticFolder }/`
        }
    };

}
