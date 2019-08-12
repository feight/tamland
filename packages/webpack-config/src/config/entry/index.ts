

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
        index: `./${ options.target }/index.ts`
    };

    if(
        options.target === "client" &&
        options.platform === "web"
    ){
        entry["service-worker"] = "./service-worker.ts";
    }

    return {
        entry
    };

}
