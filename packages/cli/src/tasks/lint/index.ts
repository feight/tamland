

import { TamlandConfig } from "@tamland/config";

import { lintCSSTask } from "./css";
import { lintJSTask } from "./js";


export interface LintTaskOptions{
    watch?: boolean;
}


export const lintTask = async function(config: TamlandConfig, options: LintTaskOptions): Promise<void>{

    const watch = options.watch || false;

    await Promise.all([
        lintCSSTask(config.lint.css, watch),
        lintJSTask(config.lint.js, watch)
    ]);

};
