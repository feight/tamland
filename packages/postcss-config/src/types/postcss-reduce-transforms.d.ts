

declare module "postcss-reduce-transforms" {

    import { Plugin } from "postcss";

    interface PluginOptions{}

    export default class PostCssPlugin extends Plugin{

        constructor(options: PluginOptions);

    }

}
