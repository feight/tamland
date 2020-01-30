

import { logger } from "@tamland/logger";
import {
    Mode,
    Platform,
    TamlandConfig
} from "@tamland/config";

import { webpackTask } from "../webpack";


export interface BuildTaskOptions{
    hostname?: string;
    mode: Mode;
    platform: Platform;
}


export const buildTask = async function(config: TamlandConfig, options: BuildTaskOptions): Promise<void>{

    if(config.hooks.build.pre){

        await config.hooks.build.pre(config, options, logger);

    }

    await webpackTask(config, options);

    if(config.hooks.build.post){

        await config.hooks.build.post(config, options, logger);

    }

};
