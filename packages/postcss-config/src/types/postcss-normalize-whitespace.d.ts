

declare module "postcss-normalize-whitespace" {

    import { Plugin } from "postcss";

    interface PluginOptions{}

    export default class PostCssPlugin extends Plugin{

        constructor(options: PluginOptions);

    }

}
