

import path from "path";

import fs from "fs-extra";
import { logger } from "@tamland/logger";
import {
    Platform,
    TamlandConfig
} from "@tamland/config";


const label = "clean";


const remove = async (removePath: string): Promise<void> => {

    const exists = await fs.pathExists(removePath);

    logger.log(removePath, {
        color: exists ? "#ffffff" : "#777777",
        label
    });

    if(exists){

        await fs.remove(removePath);

    }

};


export interface CleanTaskOptions{
    platform: Platform;
}

export const cleanTask = async function(config: TamlandConfig, options?: CleanTaskOptions): Promise<void>{

    const {
        platform = "web"
    } = options || {};

    const paths = [
        path.join(config.cwd, `src/${ platform }/dist`)
    ];

    paths.sort((pathA: string, pathB: string): number => pathA.localeCompare(pathB));

    await Promise.all(paths.map((pth): Promise<void> => remove(pth)));

};
