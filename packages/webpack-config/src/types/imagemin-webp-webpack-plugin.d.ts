

declare module "imagemin-webp-webpack-plugin" {

    import { Plugin } from 'webpack';

    interface PluginOptions{
        config: {
                test: RegExp,
                options: {
                quality:  number
            }
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
