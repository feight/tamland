

import merge from "webpack-merge";
import { Configuration } from "webpack";
import {
    Mode,
    Platform,
    Target
} from "@tamland/config";

import config from "./config";


export type CSSLoader = "file" | "module" | "string";


export interface PortConfigurationOptions{
    bundleAnalyzer: number;
    devServer: number;
}


export interface ConfigurationOptions{
    bundleAnalyzer?: boolean;
    defaultCssLoader?: CSSLoader;
    multipleTargeting?: boolean;
    outputPath?: string;
    ports?: PortConfigurationOptions;
    staticFolder?: string;
}


export interface Environment{
    cwd?: string;
    hostname?: string;
    mode?: Mode;
    platform?: Platform;
    target?: Target;
}


export interface Optimizations{
    brotli: boolean;
    preact: boolean;
    gzip: boolean;
    webp: boolean;
}


export interface Options{
    bundleAnalyzer: boolean;
    cwd: string;
    defaultCssLoader: CSSLoader;
    hostname?: string;
    mode: Mode;
    multipleTargeting: boolean;
    optimizations: Optimizations;
    outputPath: string;
    platform: Platform;
    ports: PortConfigurationOptions;
    staticFolder: string;
    target: Target;
    targetPath: string;
    watch: boolean;
}


export interface Args{
    mode?: Mode;
    watch?: boolean;
}


const generateDefaultOptions = function(mode: Args["mode"]): Options{

    return {
        bundleAnalyzer: true,
        cwd: process.cwd(),
        defaultCssLoader: "file",
        mode: "development",
        multipleTargeting: true,
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

            /*
             * Can't get this to work quite right
             */
            preact: false,
            webp: mode !== "production"
        },
        outputPath: "dist",
        platform: "web",
        ports: {
            bundleAnalyzer: 3001,
            devServer: 3002
        },
        staticFolder: "static",
        target: "client",
        targetPath: "",
        watch: false
    };

};

const generateOptions = function(webpackOptions: ConfigurationOptions, environment: Environment, args: Args): Options{

    const optionsDefaults = generateDefaultOptions(args.mode);

    const options: Options = Object.assign(optionsDefaults, {
        bundleAnalyzer: typeof webpackOptions.bundleAnalyzer === "undefined" ? optionsDefaults.bundleAnalyzer : webpackOptions.bundleAnalyzer,
        cwd: environment.cwd ?? optionsDefaults.cwd,
        defaultCssLoader: webpackOptions.defaultCssLoader ?? optionsDefaults.defaultCssLoader,
        hostname: environment.hostname,
        mode: args.mode ?? optionsDefaults.mode,
        multipleTargeting: typeof webpackOptions.multipleTargeting === "undefined" ? optionsDefaults.multipleTargeting : webpackOptions.multipleTargeting,
        outputPath: webpackOptions.outputPath ?? optionsDefaults.outputPath,
        platform: environment.platform ?? optionsDefaults.platform,
        ports: {
            ...optionsDefaults.ports,
            ...webpackOptions.ports
        },
        staticFolder: webpackOptions.staticFolder ?? optionsDefaults.staticFolder,
        target: environment.target ?? optionsDefaults.target,
        watch: args.watch ?? optionsDefaults.watch
    });

    options.targetPath = options.multipleTargeting ? `${ options.target }` : optionsDefaults.targetPath;

    // Make sure options.staticFolder doesn't have any outer slashes
    options.staticFolder = options.staticFolder.replace(/^\/+|\/+$/gu, "");

    return options;

};


export default function configure(
    webpackConfig: Configuration = {},
    webpackOptions: ConfigurationOptions = {}
): (
    environment: Environment,
    args: Args
) => Configuration{

    return (
        environment: Environment = {},
        args: Args = {}
    ): Configuration => {

        const options = generateOptions(webpackOptions, environment, args);

        /*
         * Output configuration is used by other configurations, so we set it up
         * first and pass it in the other configurations.
         */
        const configuration = merge(config.output(options), webpackConfig);

        // Deep merge all base configuration with custom configuration
        const merged = merge(
            config.devServer(options),
            config.devtool(options),
            config.entry(options),
            config.externals(options),
            config.mode(options),
            config.module(options, configuration),
            config.optimization(options),
            config.performance(options),
            config.plugins(options, configuration),
            config.resolve(options),
            config.stats(),
            config.target(options),
            config.watchOptions(),
            configuration
        );

        /*
         * Override the entry branch of configuration if one was specified in the
         * custom configuration
         */
        if(configuration.entry){

            merged.entry = configuration.entry;

        }

        return merged;

    };

}
