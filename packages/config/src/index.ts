

import path from "path";

import merge from "deepmerge";
import rcfile from "rc-config-loader";
import { Logger } from "@tamland/logger";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cfg: any = rcfile("tamland");
const user = cfg && cfg.config ? cfg.config : {};
const base = "src/*/!(node_modules|dist)/**/*";

const defaults = {
    firestore: {
        host: "127.0.0.1",
        port: 9811
    },
    hooks: {
        build: {
            /* eslint-disable no-undefined */
            post: undefined,
            pre: undefined
            /* eslint-enable no-undefined */
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
            port: 3002
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


export type Mode = "development" | "production";

export type Platform = "desktop" | "mobile" | "web";

export type Target = "client" | "server";

export interface BuildOptions{
    mode: Mode;
    platform: Platform;
}

export type BuildHook = (config: TamlandConfig, options: BuildOptions, logger: Logger) => Promise<void>;


export interface TamlandConfig{
    cwd: string;
    firestore: {
        host: string;
        port: number;
    };
    hooks: {
        build: {
            post: BuildHook | undefined;
            pre: BuildHook | undefined;
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
                hostname?: string;
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


export const config = merge.all([
    defaults,
    user,
    forced
]) as TamlandConfig;
