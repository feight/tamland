

import {
    Mode,
    Platform,
    TamlandConfig
} from "@tamland/config";

import { localFirestoreTask } from "./firestore";
import { localMemcachedTask } from "./memcached";
import { localServerTask } from "./server";

import { openTask } from "../open";
import { tamlandTask } from "../tamland";
import { buildTask } from "../build";


export interface LocalTaskOptions{
    mode: Mode;
    platform: Platform;
    watch: boolean;
}


export const localTask = async function(config: TamlandConfig, options: LocalTaskOptions): Promise<void>{

    await tamlandTask(config);

    await Promise.all([
        localFirestoreTask(config),
        localMemcachedTask(),
        openTask(`http://localhost:${ config.nodemon.port }`),
        localServerTask(config, options),
        buildTask(config, options)
    ]);

};
