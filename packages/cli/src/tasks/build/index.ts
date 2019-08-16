

import { logger } from "@tamland/logger";
import {
    Mode,
    Platform,
    TamlandConfig
} from "@tamland/config";

import { cleanTask } from "../clean";
import { webpackTask } from "../webpack";


export interface BuildTaskOptions{
    hostname?: string;
    mode: Mode;
    platform: Platform;
}


export const buildTask = async function(config: TamlandConfig, options: BuildTaskOptions): Promise<void>{

    await config.hooks.build.pre(config, options, logger);

    await cleanTask(config, options);
    await webpackTask(config, options);

    await config.hooks.build.post(config, options, logger);

};
