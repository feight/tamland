

import { Configuration } from "webpack";

import { Options } from "../..";


export default function configuration(
    options: Options
): Configuration{

    return {
        target: options.target === "client" ? "web" : "node"
    };

}
