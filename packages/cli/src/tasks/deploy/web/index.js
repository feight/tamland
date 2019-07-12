

import path from "path";

import notifier from "node-notifier";

import build from "../../build";
import { exec } from "../../../utils/subprocess";
import prompts from "../../../prompts";
import tamland from "../../tamland";


const deployWeb = async function(config, options){

    await tamland(config, options);

    const projectId = await prompts.environments.web();
    const version = options.version ? `--version=${ options.version }` : "";
    const project = `--project=${ projectId }`;
    const verbosity = `--verbosity=${ options.verbosity || "error" }`;

    await build(config, options);

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

    notifier.notify({
        contentImage: config.icon,
        icon: path.join(__dirname, "../../../images/icon.png"),
        message: `${ projectId }.appspot.com`,
        sound: "Blow",
        timeout: 30,
        title: `Deployed ${ config.name }`
    });

    await exec({
        command: `
            gcloud app browse
            ${ project }
        `,
        label: "deploy"
    });

    /*
     * Something makes this process hang sometimes, it's pretty safe to kill it
     * with fire since it's the end of a deploy and nothing more needs to happen.
     */
    process.exit();

};


export default deployWeb;
