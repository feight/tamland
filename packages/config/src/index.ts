

import path from "path";

import merge from "deepmerge";
import rcfile from "rc-config-loader";


// Need this to be here
// eslint-disable-next-line import/exports-last
export interface TamlandConfig {
    cwd: string;
    firestore: {
        host: string;
        port: number;
    };
    hooks: {
        build: {
            post: () => void;
            pre: () => void;
        };
    };
    icon: string;
    lint: {
        css: string[];
        js: string[];
    };
    name: string;
    nodemon: {
        port: number;
    };
    optimize: {
        image: {
            paths: string[];
        };
    };
    platform: {
        web: {
            environments: {
                name: string;
                project: string;
            }[];
        };
    };
    tamland?: {
        path: string;
    };
    targets: string[];
    webpack: {
        devServer: {
            port: number;
        };
    };
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cfg: any = rcfile("tamland");
const user = cfg && cfg.config ? cfg.config : {};

// This is fine for explicit no operation functions
// eslint-disable-next-line no-empty-function
const noop = (): void => {};
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


export const config = merge.all([
    defaults,
    user,
    forced
]) as TamlandConfig;
