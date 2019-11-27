

import merge from "webpack-merge";
import { Configuration } from "webpack";


export default function configuration(config: Configuration): Configuration{

    return merge(config, {
        module: {
            rules: [
                // .json file extensions
                {
                    test: /\.json$/u,
                    type: "javascript/auto",
                    use: ["json-loader"]
                }
            ]
        }
    });

}
