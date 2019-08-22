
/*
 * These lints are off because babel references this configuration without
 * transpilation and the filename isn't optional.
 */

/*

    eslint

    filenames/match-regex: "off",
    import/no-commonjs: "off",
    import/unambiguous: "off",

*/


const baseNodeVersion = 8;


module.exports = function babelConfiguration(api){

    api.cache(false);

    const mjs = process.env.BUILD_MJS === "1";
    const shebang = process.env.BUILD_SHEBANG === "1";

    return {
        presets: [
            [
                "@tamland/babel-preset",
                {
                    addModuleExports: !mjs,
                    modules: !mjs,
                    shebang,
                    targets: {
                        node: mjs ? true : baseNodeVersion
                    }
                }
            ]
        ]
    };

};
