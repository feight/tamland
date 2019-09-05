

const presetConfiguration = require("./babel-preset.config");


module.exports = function babelConfiguration(api){

    api.cache(false);

    return {
        presets: [
            [
                "@tamland/babel-preset",
                presetConfiguration
            ]
        ]
    };

};
