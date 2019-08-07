

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

    return {
        entry: {
            index: `./${ options.target }/index.ts`
        }
    };

}
