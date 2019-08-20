

declare module "brotli-webpack-plugin" {

    import { Plugin } from 'webpack';

    interface PluginOptions{
        asset: string,
        minRatio: number,
        test: RegExp,
        threshold: number,
    }

    export default class BrotliPlugin extends Plugin{

        constructor(options: PluginOptions);

    }

}
