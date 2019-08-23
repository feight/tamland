

import merge from "webpack-merge";
import { Configuration } from "webpack";
import {
    Mode,
    Platform,
    Target
} from "@tamland/config";

import config from "./config";


export interface ConfigurationOptions {
    bundleAnalyzerPort?: number;
    staticFolder?: string;
    watch?: boolean;
}


export interface Environment {
    cwd?: string;
    hostname?: string;
    mode?: Mode;
    platform?: Platform;
    target?: Target;
    watch?: boolean;
}


export interface Optimizations {
    brotli: boolean;
    gzip: boolean;
    webp: boolean;
}


export interface Options {
    bundleAnalyzerPort: number;
    cwd: string;
    hostname?: string;
    mode: Mode;
    optimizations: Optimizations;
    platform: Platform;
    staticFolder: string;
    target: Target;
    watch: boolean;
}


export default function configure(
    webpackConfig: Configuration = {},
    webpackOptions: ConfigurationOptions = {}
): (environment: Environment) => Configuration{

    return (environment: Environment = {}): Configuration => {

        const optionsDefaults: Options = {
            bundleAnalyzerPort: 3001,
            cwd: process.cwd(),
            mode: "development",
            optimizations: {

                /*
                 * Doesn't work in nodejs on production because of accept encodings
                 * header is stripped
                 */
                brotli: false,

                /*
                 * Doesn't work in nodejs on production because of accept encodings
                 * header is stripped
                 */
                gzip: false,
                webp: environment.mode !== "production"
            },
            platform: "web",
            staticFolder: "static",
            target: "client",
            watch: Boolean(process.env.watch || false)
        };

        const options: Options = Object.assign(optionsDefaults, {
            bundleAnalyzerPort: webpackOptions.bundleAnalyzerPort,
            cwd: environment.cwd || optionsDefaults.cwd,
            hostname: environment.hostname,
            mode: environment.mode || optionsDefaults.mode,
            platform: environment.platform || optionsDefaults.platform,
            staticFolder: webpackOptions.staticFolder || optionsDefaults.staticFolder,
            target: environment.target || optionsDefaults.target,
            // Bug in the linter
            // eslint-disable-next-line security/detect-non-literal-fs-filename
            watch: Boolean(environment.watch) || optionsDefaults.watch
        });

        // Make sure options.staticFolder doesn't have any outer slashes
        options.staticFolder = options.staticFolder.replace(/^\/+|\/+$/gu, "");

        /*
         * Output configuration is used by other configurations, so we set it up
         * first and pass it in the other configurations.
         */
        const configuration = merge(config.output(webpackConfig, options), webpackConfig);

        return merge(
            config.devServer(configuration, options),
            config.devtool(configuration, options),
            config.entry(configuration, options),
            config.externals(configuration, options),
            config.mode(configuration, options),
            config.module(configuration, options),
            config.optimization(configuration, options),
            config.performance(configuration, options),
            config.plugins(configuration, options),
            config.resolve(configuration, options),
            config.stats(),
            config.target(configuration, options),
            config.watchOptions(),
            configuration
        );

    };

}
