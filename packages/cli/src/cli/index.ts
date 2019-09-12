
/*

    eslint

    @typescript-eslint/no-misused-promises: "off"

*/

import "core-js/stable";
import "regenerator-runtime/runtime";

import program from "commander";
import { logger } from "@tamland/logger";

import packageJSON from "../../package.json";
import { config } from "../config";
import { buildTask } from "../tasks/build";
import { cleanTask } from "../tasks/clean";
import { deployTask } from "../tasks/deploy";
import { lintTask } from "../tasks/lint";
import { localTask } from "../tasks/local";
import { optimizeTask } from "../tasks/optimize";
import { setupTask } from "../tasks/setup";
import { tamlandTask } from "../tasks/tamland";


// This is dodgy, but the typing of this in globals.d.ts is kinda wierd
// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on("unhandledRejection", (error: any): void => logger.error(error));

process.on("uncaughtException", (error: Error): void => logger.error(error));


program.version(packageJSON.version);


const task = (fn: Promise<void>): void => {

    // A floating promise is needed here since commander does accept async functions
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async (): Promise<void> => {

        await fn;

        // This has to happen because the process doesn't exit by itself for some reason
        process.exit();

    })();

};


program
.command("build")
.option("-p, --platform [platform]", "device platform (defaults to 'web')")
.action((options): void => task(buildTask(config, {
    mode: "production",
    platform: options.platform || "web"
})));


program
.command("clean")
.action((): void => task(cleanTask(config)));


program
.command("tamland")
.action((): void => task(tamlandTask(config)));


program
.command("deploy")
.option("-p, --platform [platform]", "device platform (defaults to 'web')")
.action((options): void => task(deployTask(config, {
    mode: "production",
    platform: options.platform || "web"
})));


program
.command("lint")
.option("-w, --watch", "Watch the lint")
.option("-p, --platform [platform]", "device platform (defaults to 'web')")
.action((options): void => task(lintTask(config, {
    watch: options.watch || false
})));


program
.command("local")
.option("-p, --platform [platform]", "device platform (defaults to 'web')")
.option("--production", "run the local server as close to production as possible (defaults to false)")
.action((options): void => task(localTask(config, {
    mode: options.production ? "production" : "development",
    platform: options.platform || "web",
    watch: !options.production
})));


program
.command("optimize")
.action((): void => task(optimizeTask(config)));


program
.command("setup")
.action((): void => task(setupTask(config)));


program
.command("promote")
.action((): void => {

    console.log("promote");

});


program.parse(process.argv);
