

const presetConfiguration = require("../../shared/babel-preset.config");


module.exports = function babelConfiguration(api){

    api.cache(false);

    return {
        presets: [
            [
                "@tamland/babel-preset",
                {
                    reactHotLoader: true,
                    ...presetConfiguration
                }
            ]
        ]
    };

};
