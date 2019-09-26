

import fs from "fs";
import path from "path";

import { Configuration } from "webpack";

import { Options } from "../..";


/*
 * The entrypoint for the application.
 *
 * https://webpack.js.org/concepts/entry-points/
 */
export default function configuration(
    config: Configuration,
    options: Options
): Configuration{

    const entry: { [key: string]: string } = {
        index: `./${ path.join(options.multipleTargeting ? options.targetPath : "src", "index.ts") }`
    };

    if(
        options.target === "client" &&
        options.platform === "web"
    ){

        const serviceWorkerPath = path.join(path.join(options.multipleTargeting ? "" : "src", "service-worker.ts"));

        // This is safe and performant in this context
        // eslint-disable-next-line security/detect-non-literal-fs-filename, no-sync
        if(fs.existsSync(serviceWorkerPath)){
            entry["service-worker"] = `./${ serviceWorkerPath }`;
        }

    }

    return {
        entry
    };

}
