

import { brewSetupTask } from "./brew";
import { gcloudSetupTask } from "./gcloud";
import { javaSetupTask } from "./java";
import { rubySetupTask } from "./ruby";
import { xcodeSetupTask } from "./xcode";


export const setupTask = async function(): Promise<void>{

    await xcodeSetupTask();

    await gcloudSetupTask();
    await gcloudSetupTask("core");
    await gcloudSetupTask("beta");
    await gcloudSetupTask("cloud-firestore-emulator");

    await rubySetupTask();
    await javaSetupTask();

    await brewSetupTask();
    await brewSetupTask("graphicsmagick");
    await brewSetupTask("imagemagick");
    await brewSetupTask("memcached");

};
