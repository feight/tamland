

import { logger } from "@tamland/logger";

import { spawn } from "../../utils/subprocess";


const label = "setup";


export const rubySetupTask = async function(): Promise<void>{

    try{

        // Check if ruby is installed
        await spawn({
            command: "ruby --version",
            detatch: true
        });

        logger.log("✔ ruby", {
            color: "#00ff00",
            label
        });

    }catch(error){

        logger.error([
            "",
            "Ruby is not installed on this machine.",
            "",
            "Please install it manually before you proceed.",
            ""
        ].join("\n"), { label });

        process.exit();

    }

};
