

declare module "workbox-webpack-plugin" {

    import { Plugin } from 'webpack';

    interface PluginOptions{}

    export class InjectManifest extends Plugin{

        constructor(options: PluginOptions);

    }

}
