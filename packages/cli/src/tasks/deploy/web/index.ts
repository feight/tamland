

import path from "path";

import notifier from "node-notifier";
import {
    Mode,
    Platform,
    TamlandConfig
} from "@tamland/config";

import { buildTask } from "../../build";
import { exec } from "../../../utils/subprocess";
import { openTask } from "../../open";
import prompts from "../../../prompts";
import { tamlandTask } from "../../tamland";


export interface DeployWebTaskOptions{
    mode: Mode;
    platform: Platform;
    verbosity?: string;
    version?: string;
}


export const deployWebTask = async function(config: TamlandConfig, options: DeployWebTaskOptions): Promise<void>{

    await tamlandTask(config);

    const environment = await prompts.environments.web();
    const version = options.version ? `--version=${ options.version }` : "";
    const project = `--project=${ environment.project }`;
    const verbosity = `--verbosity=${ options.verbosity || "error" }`;
    const url = `https://${ environment.hostname || `${ environment.project }.appspot.com` }`;

    await buildTask(config, {
        hostname: environment.hostname,
        mode: options.mode,
        platform: options.platform
    });

    process.chdir(config.cwd);

    await exec({
        command: `
            gcloud app deploy
            src/web/app.yaml
            ${ version }
            ${ project }
            ${ verbosity }
            --quiet
        `,
        label: "deploy"
    });

    await openTask(url);

    notifier.notify({
        contentImage: config.icon,
        icon: path.join(__dirname, "../../../images/icon.png"),
        message: url,
        sound: "Blow",
        timeout: 30,
        title: `Deployed ${ config.name }`
    });

    /*
     * Something makes this process hang sometimes, it's pretty safe to kill it
     * with fire since it's the end of a deploy and nothing more needs to happen.
     */
    process.exit();

};
