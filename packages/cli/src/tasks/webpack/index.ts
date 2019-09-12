

import path from "path";

import sequential from "promise-sequential";
import webpack from "webpack";
import { logger } from "@tamland/logger";
import {
    Mode,
    Platform,
    Target,
    TamlandConfig
} from "@tamland/config";

import { kill } from "../../utils/kill";
import { spawn } from "../../utils/subprocess";


const statsOptions = {
    builtAt: false,
    colors: true,
    entrypoints: false,
    hash: false,
    modules: false,
    timings: false,
    version: false
};


const log = (
    label1: string,
    label2: string
): (
    error?: Error,
    stats?: webpack.Stats
) => void => (error, stats): void => {

    const options = {
        label: label1
    };

    if(error){

        console.error(error);

        process.exit();

    }else{

        if(stats){

            logger.log("", options);

            logger.log(stats.toString(statsOptions), options);

            logger.log("", options);

        }

        logger.log(`${ label2 }`, options);

        logger.log("", options);

    }

};


export interface WebpackTaskOptions{
    hostname?: string;
    mode?: Mode;
    platform?: Platform;
    watch?: boolean;
}


// eslint-disable-next-line max-lines-per-function
export const webpackTask = async function(config: TamlandConfig, options: WebpackTaskOptions): Promise<void>{

    const {
        hostname,
        mode = "production",
        platform = "web",
        watch = false
    } = options;

    process.chdir(path.join(config.cwd, `src/${ platform }`));

    // We'll allow this for now
    // eslint-disable-next-line no-async-promise-executor, @typescript-eslint/no-misused-promises
    const webpackPromise = (target: Target): () => Promise<void> => (): Promise<void> => new Promise(async (resolve): Promise<void> => {

        const label = "webpack";
        const webpackConfigFile = path.join(process.cwd(), "webpack.config.js");

        // This doesn't present any danger and is necessary in this case.
        // eslint-disable-next-line max-len
        // eslint-disable-next-line import/no-dynamic-require, security/detect-non-literal-require, global-require, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
        const webpackConfig = require(webpackConfigFile)({
            hostname,
            platform,
            target,
            watch
        }, {
            mode
        });

        const compiler = webpack(webpackConfig);

        if(watch){

            if(webpackConfig.devServer){

                await kill("webpack-dev-server");

                await spawn({
                    command: [
                        "webpack-dev-server",
                        `--mode=${ mode }`,
                        `--env.hostname=${ hostname }`,
                        `--env.watch=${ watch }`,
                        `--env.platform=${ platform }`,
                        `--env.target=${ target }`
                    ].join(" "),
                    label
                });

            }else{

                compiler.watch({
                    aggregateTimeout: 600,
                    ignored: [
                        "node_modules"
                    ],
                    poll: false
                },
                (error, stats): void => {

                    log(label, `Watching ${ webpackConfigFile } ${ target }`)(error, stats);

                    logger.log("");

                });

            }

        }else{

            logger.log(`Building ${ webpackConfigFile } ${ target }`, {
                label
            });

            compiler.run((error, stats): void => {

                log(label, `Completed ${ webpackConfigFile } ${ target }`)(error, stats);

                resolve();

            });

        }

    });

    if(watch){

        await Promise.all([
            webpackPromise("server"),
            webpackPromise("client")
        ].map((command): Promise<unknown> => command()));

    }else{

        await sequential([
            webpackPromise("client"),
            webpackPromise("server")
        ]);

        process.chdir(config.cwd);

    }

};
