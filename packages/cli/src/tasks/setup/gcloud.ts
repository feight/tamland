

import { logger } from "@tamland/logger";

import {
    exec,
    spawn
} from "../../utils/subprocess";


interface Version{
    "current_version_string": string;
    "id": string;
    "is_configuration": boolean;
    "is_hidden": boolean;
    "latest_version_string": string;
    "name": string;
    "size": number;
    "state": {
        "name": string;
    };
}

const label = "setup";

let versions: Version[] = [];


export const gcloudSetupTask = async function(component?: string): Promise<void>{

    if(component){

        if(versions.length === 0){

            const rawVersions = await exec({
                command: "gcloud components list --format=json",
                detatch: true
            });

            // This works ok - leaving it alone for now
            // eslint-disable-next-line require-atomic-updates
            versions = JSON.parse(rawVersions);

        }

        const filtered = versions.filter((item): boolean => item.id === component);

        if(filtered.length > 0){

            const [version] = filtered;

            if(version.latest_version_string === version.current_version_string){

                logger.log(`✔ gcloud ${ component }`, {
                    color: "#00ff00",
                    label
                });

            }else{

                await spawn({
                    command: "gcloud components update",
                    label
                });

            }

        }else{

            await spawn({
                command: `gcloud components install ${ component }`,
                label
            });

        }

    }else{

        let installed = "";

        try{

            // Check if the Google Cloud SDK is installed
            installed = await spawn({
                command: "gcloud --version",
                detatch: true
            });

            logger.log("✔ gcloud", {
                color: "#00ff00",
                label
            });

        }catch(error){}

        if(!installed){

            // Install the Google Cloud SDK
            await spawn({
                command: "curl https://sdk.cloud.google.com | bash",
                label
            });

            // Initialized the Google Cloud SDK
            await spawn({
                command: "gcloud init",
                label
            });

        }

    }

};
