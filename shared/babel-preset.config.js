

const baseNodeVersion = 8;

const mjs = process.env.BUILD_MJS === "1";
const shebang = process.env.BUILD_SHEBANG === "1";


module.exports = {
    addModuleExports: !mjs,
    modules: !mjs,
    shebang,
    targets: {
        node: mjs ? true : baseNodeVersion
    }
};
