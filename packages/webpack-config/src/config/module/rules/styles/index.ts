

import merge from "webpack-merge";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {
    Configuration,
    RuleSetUseItem
} from "webpack";

import { Options } from "../../../..";


/*
 * This plugin extracts CSS into separate files. It creates a CSS
 * file per JS file which contains CSS. It supports On-Demand-Loading
 * of CSS and SourceMaps.
 *
 * https://github.com/webpack-contrib/mini-css-extract-plugin
 */
const miniCssExtractPlugin = (
    config: Configuration,
    options: Options
): RuleSetUseItem => ({
    loader: MiniCssExtractPlugin.loader,
    options: {
        hmr:
                options.mode === "development" &&
                options.watch === true,
        publicPath: config.output ? config.output.publicPath : `/${ options.staticFolder }/`
    }
});


/*
 * The css-loader interprets @import and url() like
 * import/require() and will resolve them.
 *
 * https://github.com/webpack-contrib/css-loader
 */
const cssLoader = (
    options: Options,
    modules = true,
    sourceMap = true
): RuleSetUseItem => {

    const baseOptions = {
        sourceMap
    };

    const developmentLocalIdentName = "/[path][name].[ext]::.[local]";
    const productionLocalIdentName = "[hash:base64]";

    return {
        loader: "css-loader",
        options: modules ? {
            ...baseOptions,
            importLoaders: 3,
            localsConvention: "camelCaseOnly",
            modules: {
                localIdentName: options.mode === "development" ? developmentLocalIdentName : productionLocalIdentName
            },
            onlyLocals: options.target === "server"
        } : {
            ...baseOptions
        }
    };

};


/*
 * A clean-css loader for webpack.
 *
 * clean-css is a fast and efficient CSS optimizer for Node.js platform
 * and any modern browser.
 *
 * https://www.npmjs.com/package/clean-css-loader
 */
const cleanCssLoader = (): RuleSetUseItem => ({
    loader: "clean-css-loader",
    options: {
        compatibility: "ie11",
        level: {
            1: {
                specialComments: 0
            }
        }
    }
});

/*
 * Loader for webpack to process CSS as a string
 *
 * https://webpack.js.org/loaders/css-loader/#tostring
 */
const toStringLoader = (): RuleSetUseItem => ({
    loader: "to-string-loader"
});

/*
 * Loader for webpack to process CSS with PostCSS
 *
 * https://github.com/postcss/postcss-loader
 */
const postCssLoader = (): RuleSetUseItem => ({
    loader: "postcss-loader"
});


/*
 * Loads a Sass/SCSS file and compiles it to CSS.
 *
 * https://github.com/webpack-contrib/sass-loader
 */
const sassLoader = (): RuleSetUseItem => ({
    loader: "sass-loader",
    options: {
        sourceMap: true
    }
});


export default function configuration(
    config: Configuration,
    options: Options
): Configuration{

    const uses = {
        file: (options.target === "client" ? [
            miniCssExtractPlugin(config, options)
        ] : []).concat([
            cssLoader(options, false),
            cleanCssLoader(),
            postCssLoader(),
            sassLoader()
        ]),
        module: (options.target === "client" ? [
            miniCssExtractPlugin(config, options)
        ] : []).concat([
            cssLoader(options),
            cleanCssLoader(),
            postCssLoader(),
            sassLoader()
        ]),
        string: [
            toStringLoader(),
            cssLoader(options, false, false),
            cleanCssLoader(),
            postCssLoader(),
            sassLoader()
        ]
    };

    return merge(config, {
        module: {
            rules: [
                // .string.scss and .string.css style extensions
                {
                    test: /\.string\.s?css$/u,
                    use: uses.string
                },
                // .module.scss and .module.css style extensions
                {
                    test: /\.module\.s?css$/u,
                    use: uses.module
                },
                // .module.scss and .module.css style extensions
                {
                    test: /\.file\.s?css$/u,
                    use: uses.module
                },
                // .scss and .css style extensions
                {
                    test: /^((?!(file|string|module)).)*.s?css$/u,
                    use: uses[options.defaultCssLoader]
                }
            ]
        }
    });

}
