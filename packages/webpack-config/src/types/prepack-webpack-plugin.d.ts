

declare module "prepack-webpack-plugin" {

    import { Plugin } from 'webpack';

    interface PluginOptions{}

    export default class webpackPlugin extends Plugin{

        constructor(options: PluginOptions);

    }

}
