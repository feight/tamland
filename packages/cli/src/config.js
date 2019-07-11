

import path from "path";

import merge from "merge";
import userConfig from "@tamland/rc-config";


// This is fine for explicit no operation functions
// eslint-disable-next-line no-empty-function
const noop = () => {};

const base = "src/{web,mobile,desktop,shared}/!(node_modules|dist)/**/*";

const defaults = {
    firestore: {
        host: "127.0.0.1",
        port: 9811
    },
    hooks: {
        build: {
            post: noop,
            pre: noop
        }
    },
    icon: path.join(__dirname, "images/icon.png"),
    lint: {
        css: [
            `${ base }.{css,scss}`
        ],
        js: [
            `${ base }.{js,jsx,ts,tsx}`,
            `!${ base }.d.ts`
        ]
    },
    modernizr: {
        features: []
    },
    name: "Tamland Project",
    nodemon: {
        port: 5555
    },
    optimize: {
        image: {
            paths: [
                `${ base }.{png,gif,jpg,jpeg,svg}`
            ]
        }
    },
    platform: {
        web: {
            environments: []
        }
    },
    webpack: {
        devServer: {
            port: 9000
        }
    }
};

const forced = {
    cwd: process.cwd(),
    targets: [
        "desktop",
        "mobile",
        "web"
    ]
};

const config = merge.recursive(
    true,
    defaults,
    userConfig,
    forced
);


export {
    config
};
