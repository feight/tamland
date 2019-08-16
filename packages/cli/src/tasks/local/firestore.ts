

import { TamlandConfig } from "@tamland/config";

import { kill } from "../../utils/kill";
import { spawn } from "../../utils/subprocess";


export const localFirestoreTask = async function(config: TamlandConfig): Promise<void>{

    const {
        host,
        port
    } = config.firestore;

    try{

        await kill(port);

        await spawn({
            command: `gcloud beta emulators firestore start --host-port=${ host }:${ port }`,
            filter: /\[firestore\]\s/gu,
            label: "firestore"
        });

    }catch(error){}

};
