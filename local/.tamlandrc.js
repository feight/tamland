

module.exports = {
    icon: "src/base/icons/icon.png",
    name: "Local Project",
    platform: {
        web: {
            environments: [
                {
                    name: "staging",
                    project: "sweetlikepete777"
                },
                {
                    hostname: "www.newsteam.io",
                    name: "production",
                    project: "goalden-nodejs"
                }
            ]
        }
    },
    tamland: {
        path: "../"
    }
};
