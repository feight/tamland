

import { Linter } from "eslint";


import * as typescript from "./rules/plugins/typescript";


const config: Linter.Config = {
    env: {
        browser: true,
        jasmine: true,
        node: true
    },
    extends: [
        "./rules/plugins/array-func",
        "./rules/plugins/async-await",
        "./rules/plugins/css-modules",
        "./rules/plugins/es",
        "./rules/plugins/eslint-comments",
        "./rules/plugins/filenames",
        "./rules/plugins/format-message",
        "./rules/plugins/jsx-control-statements",
        "./rules/plugins/import",
        "./rules/plugins/more",
        "./rules/plugins/no-unsanitized",
        "./rules/plugins/no-useless-assign",
        "./rules/plugins/node",
        "./rules/plugins/optimize-regex",
        "./rules/plugins/prefer-object-spread",
        "./rules/plugins/promise",
        "./rules/plugins/react",
        "./rules/plugins/react-hooks",
        "./rules/plugins/react-native",
        "./rules/plugins/react-perf",
        "./rules/plugins/react-redux",
        "./rules/plugins/react-ssr",
        "./rules/plugins/security",
        "./rules/plugins/sort-keys-fix",
        "./rules/plugins/typescript",
        "./rules/plugins/unicorn",
        "./rules/plugins/webassembly",
        "./rules/plugins/you-dont-need-momentjs",
        "./rules/best-practices",
        "./rules/errors",
        "./rules/es6",
        "./rules/node",
        "./rules/strict",
        "./rules/style",
        "./rules/variables"
    ].map((string: string) => require.resolve(string)),
    overrides: [
        {
            files: ["*.js", "*.jsx"],
            rules: Object.keys(typescript.default.rules).reduce((accumulator, rule) => ({
                ...accumulator,
                [rule]: "off"
            }), {})
        },
        {
            files: ["*.ts", "*.tsx"],
            rules: {

                /*
                 * Overridden by @typescript-eslint/brace-style
                 */
                "brace-style": "off",

                /*
                 * Overridden by @typescript-eslint/naming-convention
                 */
                camelcase: "off",

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
                 * Overridden by @typescript/no-extra-parens
                 */
                "no-extra-parens": "off",

                /*
                 * Overridden by @typescript/no-extra-semi
                 */
                "no-extra-semi": "off",

                /*
                 * Turns out there are a lot of times using undefined is really useful
                 * in typescript.
                 */
                "no-undefined": "off",

                /*
                 * Overridden by @typescript-eslint/no-unused-vars because it works with
                 * imported interfaces
                 */
                "no-unused-vars": "off",

                /*
                 * Overridden by @typescript-eslint/no-use-before-define
                 */
                "no-use-before-define": "off",

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
                semi: "off",

                /*
                 * @typescript-eslint/space-before-function-paren
                 */
                "space-before-function-paren": "off"

            }
        }
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        project: "./tsconfig.json",
        sourceType: "module"
    },
    plugins: ["@typescript-eslint"]
};


export default config;
