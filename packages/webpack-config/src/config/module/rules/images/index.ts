

import merge from "webpack-merge";
import { Configuration } from "webpack";

import fileLoader from "../../../../shared/loaders/file";
import { Options } from "../../../..";


export default function configuration(
    config: Configuration,
    options: Options
): Configuration{

    return merge(config, {
        module: {
            rules: [
                // .png .jpg .jpeg .gif .webp and .ico image extensions
                {
                    test: /\.(?:png|jpg|jpeg|gif|webp)$/u,

                    /*
                     * We don't use an optimizer like image-webpack-loader because
                     * we optimize images manually using tamland optimize
                     */
                    use: [
                        fileLoader(config, options),
                        {
                            loader: "image-process-loader"
                        }
                    ]
                },
                // .svg .png .jpg .jpeg .gif .webp and .ico image extensions
                {
                    test: /\.(?:svg|ico)$/u,

                    /*
                     * We don't use an optimizer like image-webpack-loader because
                     * we optimize images manually using tamland optimize
                     */
                    use: [
                        fileLoader(config, options)
                    ]
                }
            ]
        }
    });

}
