

import rcfile from "rc-config-loader";


interface WebEnvironment {
    name: string;
    project: string;
}

interface WebPlatform {
    environments: WebEnvironment[];
}

interface Platform {
    web: WebPlatform;
}

interface Tamland {
    path?: string;
}

interface Config {
    platform?: Platform;
    tamland?: Tamland;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cfg: any = rcfile("tamland");

const config: Config = cfg && cfg.config ? cfg.config : {};


export default config;
