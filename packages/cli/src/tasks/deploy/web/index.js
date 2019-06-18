

import path from "path";

import build from "../../build";
import { exec } from "../../../utils/subprocess";
import prompts from "../../../prompts";


const deployWeb = async function(config, options){

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

};


export default deployWeb;
