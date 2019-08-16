

import {
    Mode,
    Platform,
    TamlandConfig
} from "@tamland/config";

import { deployWebTask as web } from "./web";


export interface DeployTaskOptions{
    mode: Mode;
    platform: Platform;
    verbosity?: string;
    version?: string;
}


export const deployTask = async function(config: TamlandConfig, options: DeployTaskOptions): Promise<void>{

    if(options.platform === "web"){

        await web(config, options);

    }

};
