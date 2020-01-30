

import { logger } from "@tamland/logger";

import {
    exec,
    spawn
} from "../../utils/subprocess";


const label = "setup";


export const javaSetupTask = async function(): Promise<void>{

    try{

        // Check if java is installed
        await spawn({
            command: "java --version",
            detatch: true
        });

        logger.log("✔ java", {
            color: "#00ff00",
            label
        });

    }catch(error){

        await spawn({
            command: "brew cask install java",
            label: "setup"
        });

    }

    const info = await exec({
        command: "brew cask info java",
        detatch: true
    });

    const [match] = (/(\/Library\/Java\/JavaVirtualMachines\/.*?\.jdk)/gu).exec(info) ?? [];

    if(match){

        try{

            await exec({
                command: `xattr -d com.apple.quarantine ${ match }`,
                detatch: true
            });

        }catch(error){}

    }

};
