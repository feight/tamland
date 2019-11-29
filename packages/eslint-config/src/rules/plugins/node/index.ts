

/*
 * Additional ESLint's rules for Node.js
 *
 * https://github.com/mysticatea/eslint-plugin-node
 */


export default {
    extends: [
        "./best-practices",
        "./errors",
        "./style"
    ].map((string: string) => require.resolve(string)),
    plugins: ["node"],
    settings: {
        node: {
            allowModules: ["jasmine"]
        }
    }
};
