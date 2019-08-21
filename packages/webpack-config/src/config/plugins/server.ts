

import webpack, { Configuration } from "webpack";


export const server = function(): Configuration{

    return {
        plugins: [
            new webpack.BannerPlugin({
                banner: "require(\"source-map-support\").install();",
                entryOnly: false,
                raw: true,
                test: /\.js$/u
            })
        ]
    };

};
