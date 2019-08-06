

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
                    hostname: "www.goalden.co.za",
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
