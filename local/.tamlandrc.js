

const path = require("path");


module.exports = {
    icon: path.join(__dirname, "icon.png"),
    name: "Local Project",
    platform: {
        web: {
            environments: [
                {
                    name: "staging",
                    project: "sweetlikepete777"
                },
                {
                    name: "production",
                    project: "newsteam-site-production"
                }
            ]
        }
    },
    tamland: {
        path: "../"
    }
};
