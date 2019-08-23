

declare module "imagemin-webp-webpack-plugin" {

    import { Plugin } from 'webpack';

    interface PluginOptions{
        config: {
            options: {
                lossless?: boolean,
                quality?:  number
            },
            test: RegExp
        }[],
        overrideExtension: boolean,
        detailedLogs: boolean,
        silent: boolean,
        strict: boolean
    }

    export default class ImageminWebpWebpackPlugin extends Plugin{

        constructor(options: PluginOptions);

    }

}
