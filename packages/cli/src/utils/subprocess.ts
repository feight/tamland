

import childProcess from "child_process";

import through from "through2";
import { logger } from "@tamland/logger";
import type nodePTY from "node-pty";

// Doesn't work without require and it's safe to do it here since it's just a test
// eslint-disable-next-line import/no-commonjs, @typescript-eslint/no-require-imports, global-require
const pty = require("node-pty") as typeof nodePTY;


// eslint-disable-next-line max-lines-per-function
export const exec = function(options: {
    command: string;
    detatch?: boolean;
    filter?: string | RegExp | (string | RegExp)[];
    label?: string;
}): Promise<string>{

    return new Promise((resolve: (string: string) => void, reject: (error: Error) => void): void => {

        const {
            command = "",
            detatch = false,
            filter = [],
            label = "anonymous"
        } = options;

        if(command){

            let cmd = Array.isArray(command) ? command.join(" ") : command;

            cmd = cmd
            .replace(/\r\n|\r|\n/gu, "")
            .replace(/\s\s+/gu, " ")
            .replace(/^\s/gu, "");

            const bashCmd = cmd;

            if(!detatch){
                logger.command(label, bashCmd);
            }

            const subprocess = childProcess.exec(cmd, (error, stdout): void => {

                if(error){

                    if(!detatch){

                        console.log("");

                        logger.error(error.stack, { label });

                    }

                    reject(error);

                }else{

                    resolve(stdout);

                }

            });

            if(!detatch && subprocess.stdin){
                process.stdin.pipe(subprocess.stdin);
            }

            const piper = (std: "stdout" | "stderr"): void => {

                const proc = std === "stdout" ? subprocess.stdout : subprocess.stderr;

                if(proc !== null){

                    proc.pipe(through.obj((string: string, encoding, done): void => {

                        let formattedString = string;

                        (Array.isArray(filter) ? filter : [filter]).forEach((filt): void => {
                            formattedString = formattedString.replace(filt, "");
                        });

                        if(!detatch){
                            logger.write(formattedString, { label });
                        }

                        done();

                    }));

                }

            };

            piper("stdout");
            piper("stderr");

            if(subprocess.stdout !== null){

                subprocess.stdout.on("end", (): void => {

                    if(!detatch){
                        process.stdin.end();
                    }

                });

            }

        }else{

            reject(new Error("No command passed to exit(options)"));

        }

    });

};

export const spawn = function(options: {
    cwd?: string;
    command: string;
    environment?: { [key: string]: string };
    filter?: string | RegExp | (string | RegExp)[];
    detatch?: boolean;
    label?: string;
}): Promise<string>{

    const {
        cwd = process.cwd(),
        command = "",
        environment = process.env as { [key: string]: string },
        filter = [],
        detatch = false,
        label = "anonymous"
    } = options;

    return new Promise((resolve: (string: string) => void, reject: (error: number | Error) => void): void => {

        if(command){

            let cmd = Array.isArray(command) ? command.join(" ") : command;

            cmd = cmd
            .replace(/\r\n|\r|\n/gu, "")
            .replace(/\s\s+/gu, " ")
            .replace(/^\s/gu, "");

            const bashCmd = cmd;

            if(!detatch){
                logger.command(label, bashCmd);
            }

            const [cm, ...args] = bashCmd.split(" ");

            const term = pty.spawn(cm, args, {
                cols: 500,
                cwd,
                env: environment
            });

            const response: string[] = [];

            term.on("data", (data: string): void => {

                response.push(data);

                let formatted = data;

                (Array.isArray(filter) ? filter : [filter]).forEach((filt): void => {
                    formatted = formatted.replace(filt, "");
                });

                if(!detatch){
                    logger.write(formatted, { label });
                }

            });

            term.on("exit", (code: number): void => {

                term.kill();

                if(!detatch){
                    process.stdin.end();
                }

                if(code === 1){
                    reject(code);
                }else{
                    resolve(response.join(""));
                }

            });

        }else{

            reject(new Error("No command passed to spawn(options)"));

        }

    });

};
