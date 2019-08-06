

import path from "path";

import notifier from "node-notifier";

import build from "../../build";
import { exec } from "../../../utils/subprocess";
import open from "../../open";
import prompts from "../../../prompts";
import tamland from "../../tamland";


const deployWeb = async function(config, options){

    await tamland(config, options);

    const environment = await prompts.environments.web();
    const version = options.version ? `--version=${ options.version }` : "";
    const project = `--project=${ environment.project }`;
    const verbosity = `--verbosity=${ options.verbosity || "error" }`;
    const url = `https://${ environment.hostname || `${ environment.project }.appspot.com` }`;

    await build(config, {
        hostname: environment.hostname,
        ...options
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

    /*
     * Something makes this process hang sometimes, it's pretty safe to kill it
     * with fire since it's the end of a deploy and nothing more needs to happen.
     */
    process.exit();

};


export default deployWeb;
