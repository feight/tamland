

import { Linter } from "eslint";

import base from "./base";


const config: Linter.Config = {
    ...base,
    extends: [
        "../rules/plugins/typescript"
    ].map((string: string) => require.resolve(string)).concat(base.extends ? base.extends : []),
    rules: {

        /*
         * Typescript needs unitialed declarations when variables have a type
         * that can be undefined
         */
        "init-declarations": "off",

        /*
         * Overridden by @typescript/no-empty-function because it doesn't trigger
         * on valid Typescript specific cases that would otherwise trigger
         */
        "no-empty-function": "off",

        /*
         * Overridden by @typescript-eslint/no-unused-vars because it works with
         * imported interfaces
         */
        "no-unused-vars": "off",

        /*
         * Overridden by @typescript-eslint/quotes to prevent errors while linting
         * typescript code.
         */
        quotes: "off",

        /*
         * The @typescript-eslint/require-await rule extends the require-await rule
         * from ESLint core, and allows for cases where the additional typing information
         * can prevent false positives that would otherwise trigger the rule.
         */
        "require-await": "off",

        /*
         * Overridden by @typescript-eslint/semi
         */
        semi: "off"

    }
};


export default config;
