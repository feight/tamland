

import { TamlandConfig } from "@tamland/config";

import { brewSetupTask } from "./brew";
import { gcloudSetupTask } from "./gcloud";
import { rubySetupTask } from "./ruby";
import { xcodeSetupTask } from "./xcode";

import { tamlandTask } from "../tamland";


export const setupTask = async function(config: TamlandConfig): Promise<void>{

    await tamlandTask(config);

    await xcodeSetupTask();

    await gcloudSetupTask();
    await gcloudSetupTask("core");
    await gcloudSetupTask("beta");
    await gcloudSetupTask("cloud-firestore-emulator");

    await rubySetupTask();

    await brewSetupTask();
    await brewSetupTask("graphicsmagick");
    await brewSetupTask("imagemagick");
    await brewSetupTask("memcached");

};
