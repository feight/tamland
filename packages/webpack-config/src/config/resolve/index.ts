

import path from "path";

import { Configuration } from "webpack";

import { Options } from "../..";


export default function configuration(
    config: Configuration,
    options: Options
): Configuration{

    return {
        resolve: {
            alias: {
                modernizr$: path.resolve(path.join(options.cwd, ".modernizrrc")),
                "react-dom": "@hot-loader/react-dom"
            },

            /*
             * The order of these is significant. It determinds which extension
             * will be matched when the dependency is defined without a file
             * extension in the path
             */
            extensions: [
                ".mjs",
                ".ts",
                ".tsx",
                ".js",
                ".jsx"
            ],
            mainFields: [
                "main",
                "module"
            ],
            modules: [
                "node_modules"
            ],
            symlinks: true
        }
    };

}
