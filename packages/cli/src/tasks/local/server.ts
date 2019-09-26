

import path from "path";

import fs from "fs-extra";
import nodemon from "nodemon";
import { logger } from "@tamland/logger";
import {
    Mode,
    Platform,
    TamlandConfig
} from "@tamland/config";

import { kill } from "../../utils/kill";


const label = "server";


const awaitServerScript = function(config: TamlandConfig): Promise<string>{

    const intervalTime = 100;
    const maxWaitTime = 10000;
    const serverScript = "dist/server/index.js";
    const awaitFiles = [
        serverScript,
        "dist/client/loadable-stats.json"
    ];

    let waited = 0;

    return new Promise((resolve, reject): void => {

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        const interval = setInterval(async (): Promise<void> => {

            process.chdir(path.join(config.cwd, "src/web"));

            const existChecks: Promise<boolean>[] = awaitFiles.map((file): Promise<boolean> => fs.pathExists(file));
            const existsArray = await Promise.all(existChecks);
            const exists = existsArray.filter((item): boolean => item !== true).length === 0;

            if(exists){

                clearInterval(interval);

                const delay = 100;

                /*
                 * Sometimes nodemon doesn't pick up the script so we're hacking
                 * a little delay to try to fix that.
                 */
                setTimeout((): void => {

                    resolve(serverScript);

                }, delay);

            }else{

                if(waited > maxWaitTime){

                    clearInterval(interval);

                    reject(new Error(`Server script was not found at ${ serverScript }`));

                }

                waited += intervalTime;

            }

        }, intervalTime);

    });

};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const output = (color: string): (data: any) => void => (data: any): void => {

    const string = data.toString();

    try{

        const log = JSON.parse(string);

        if(log.message){

            if(
                log.level === "warn" ||
                log.level === "error"
            ){

                logger.error(log.message, {
                    color: log.level === "warn" ? "#ff5400" : "#ff0000",
                    label
                });

            }else{

                logger.log(log.message, {
                    color,
                    label
                });

            }

        }

    }catch(error){

        if(string){

            logger.log(string.replace(/\n$/gu, ""), {
                color,
                label
            });

        }

    }

};


const startNodemonServer = function(script: string, environment: {
    [id: string]: string | boolean | number;
}): Promise<void>{

    return new Promise((): void => {

        nodemon({
            env: environment,
            ext: "js json",
            script,
            stdout: false,
            watch: [
                script
            ]
        });

        nodemon.on("start", (): void => {

            logger.log(`Started ${ script }\n`, { label });

            logger.table(
                "server",
                ["process.env", "value"],
                Object.keys(environment).map((key): string[] => [key, String(environment[key])]),
                {
                    align: ["r", "l"]
                }
            );

            logger.log("", { label });

        });

        nodemon.on("quit", (): void => {

            logger.log(`Quit ${ script }`, { label });

            process.exit();

        });

        nodemon.on("restart", (files: string[]): void => {

            if(files && files.length === 1){

                logger.log(`Restarted ${ files[0] }`, {
                    color: "#d3d3d3",
                    label
                });

            }else if(files){

                files.forEach((file): void => {

                    logger.log(`Restarted ${ file }`, {
                        color: "#d3d3d3",
                        label
                    });

                });

            }else{

                logger.log("Restarted", {
                    color: "#d3d3d3",
                    label
                });

            }

        });

        nodemon.on("readable", function readable(this: typeof nodemon): void{

            /* eslint-disable no-invalid-this */

            this.stdout.on("data", output("#ffffff"));
            this.stderr.on("data", output("#ff0000"));

            /* eslint-enable no-invalid-this */

        });

    });

};


export interface LocalServerTaskOptions{
    mode: Mode;
    platform: Platform;
    watch: boolean;
}


export const localServerTask = async function(
    config: TamlandConfig,
    options: LocalServerTaskOptions
): Promise<void>{

    const script = await awaitServerScript(config);

    await kill(script);

    await startNodemonServer(script, {
        FIRESTORE_EMULATOR_HOST: `${ config.firestore.host }:${ config.firestore.port }`,
        local: true,
        mode: options.mode,
        PORT: config.nodemon.port,
        watch: Boolean(options.watch),
        WEBPACK_DEV_SERVER_PORT: config.webpack.devServer.port
    });

};
