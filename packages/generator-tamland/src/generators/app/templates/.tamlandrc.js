

module.exports = {
    icon: "src/base/icons/icon.png",
    name: "<%= project %>",
    platform: {
        web: {
            environments: [
                {
                    name: "staging",
                    project: "<%= project %>"
                },
                {
                    name: "production",
                    project: "<%= project %>"
                }
            ]
        }
    }
};
