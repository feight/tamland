

import path from "path";

import notifier from "node-notifier";
import {
    Mode,
    Platform,
    TamlandConfig
} from "@tamland/config";

import { buildTask } from "../../build";
import { exec } from "../../../utils/subprocess";
import { open } from "../../../utils/open";
import prompts from "../../../prompts";


export interface DeployWebTaskOptions{
    mode: Mode;
    platform: Platform;
    verbosity?: string;
    version?: string;
}


export const deployWebTask = async function(config: TamlandConfig, options: DeployWebTaskOptions): Promise<void>{

    const environment = await prompts.environments.web();
    const version = options.version ? `--version=${ options.version }` : "";
    const project = `--project=${ environment.project }`;
    const verbosity = `--verbosity=${ options.verbosity ?? "error" }`;
    const url = `https://${ environment.hostname ?? `${ environment.project }.appspot.com` }`;

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

    await open(url);

    notifier.notify({
        contentImage: config.icon,
        icon: path.join(__dirname, "../../../images/icon.png"),
        message: url,
        sound: "Blow",
        timeout: 30,
        title: `Deployed ${ config.name }`
    });

};
