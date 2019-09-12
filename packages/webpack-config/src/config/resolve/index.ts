

import path from "path";

import { Configuration } from "webpack";

import { Options } from "../..";


export default function configuration(
    config: Configuration,
    options: Options
): Configuration{

    const alias: {
        [key: string]: string;
    } = {
        modernizr$: path.resolve(path.join(options.cwd, ".modernizrrc"))
    };

    if(options.optimizations.preact){

        alias.react = "preact-compat";
        alias["react-dom"] = "preact-compat";
        alias["react-redux"] = "preact-redux";

    }else if(options.mode === "development"){

        alias["react-dom"] = "@hot-loader/react-dom";

    }

    return {
        resolve: {
            alias,

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
