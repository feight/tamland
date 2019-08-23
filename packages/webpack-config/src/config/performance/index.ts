

import { Configuration } from "webpack";

import { Options } from "../..";


export default function performance(
    config: Configuration,
    options: Options
): Configuration{

    return {
        performance: {
            assetFilter(assetFilename: string): boolean{

                return (
                    assetFilename.endsWith(".js") ||
                    assetFilename.endsWith(".css")
                );

            },
            hints: options.mode === "production" ? "warning" : false,
            maxAssetSize: 250000,
            maxEntrypointSize: 250000
        }
    };

}
