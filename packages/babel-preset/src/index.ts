

import { declare } from "@babel/helper-plugin-utils";
import {
    ConfigAPI,
    PluginItem,
    TransformOptions
} from "@babel/core";


export interface TamlandBabelPresetOptions{
    addModuleExports: boolean,
    comments: boolean,
    debug: boolean,
    development: boolean | undefined,
    modules: boolean | "auto" | undefined,
    shebang: boolean,
    targets: string | Array<string> | { [string: string]: string }
}


export default declare((
    api: ConfigAPI,
    options: TamlandBabelPresetOptions
): TransformOptions => {

    // See docs about api at https://babeljs.io/docs/en/config-files#apicache
    api.assertVersion("^7.2.0");

    const {
        addModuleExports = false,
        comments = false,
        modules,
        shebang = false,
        targets
    } = options;

    if(typeof modules !== "undefined" && typeof modules !== "boolean" && modules !== "auto"){
        throw new TypeError("@tamland/babel-preset only accepts `true`, `false`, or `\"auto\"` as the value of the \"modules\" option");
    }

    const debug = typeof options.debug === "boolean" ? options.debug : false;
    const development = typeof options.development === "boolean" ? options.development : api.cache.using(() => process.env.NODE_ENV === "development");
    const plugins: PluginItem[] = [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-transform-named-capturing-groups-regex",
        "@loadable/babel-plugin",
        "jsx-control-statements",
        "react-hot-loader/babel"
    ];

    if(addModuleExports){
        plugins.push("add-module-exports");
    }

    if(shebang){

        plugins.push([
            "shebang",
            {
                force: true,
                replacement: "#!/usr/bin/env node"
            }
        ]);

    }

    return {
        comments,
        plugins,
        presets: [
            "@babel/preset-typescript",
            [
                "@babel/preset-env",
                {
                    debug,
                    modules: modules === false ? false : "auto",
                    targets
                }
            ],
            [
                "@babel/preset-react",
                { development }
            ]
        ]
    };

});
