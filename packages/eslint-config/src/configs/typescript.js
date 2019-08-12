

import base from "./base";


export default {
    ...base,
    extends: ["../rules/plugins/typescript"].map(require.resolve).concat(base.extends),
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

