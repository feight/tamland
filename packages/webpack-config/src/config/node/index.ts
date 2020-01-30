

import { Configuration } from "webpack";

import { Options } from "../..";


/*
 * Configures whether to polyfill or mock certain Node.js globals and modules
 *
 * https://webpack.js.org/configuration/node/
 */
export default function configuration(
    options: Options
): Configuration{

    const client: Configuration = {};

    return options.target === "client" ? client : {};

}
