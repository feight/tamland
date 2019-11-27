

import {
    Mode,
    Platform,
    TamlandConfig
} from "@tamland/config";

import { localFirestoreTask } from "./firestore";
import { localMemcachedTask } from "./memcached";
import { localServerTask } from "./server";

import { open } from "../../utils/open";
import { buildTask } from "../build";


export interface LocalTaskOptions{
    mode: Mode;
    platform: Platform;
    watch: boolean;
}


export const localTask = async function(config: TamlandConfig, options: LocalTaskOptions): Promise<void>{

    await Promise.all([
        localFirestoreTask(config),
        localMemcachedTask(),
        open(`http://localhost:${ config.nodemon.port }`),
        localServerTask(config, options),
        buildTask(config, options)
    ]);

};
