

import { RouterProps } from "../components/router";


export interface TamlandAppConfigInterface{
    backgroundColor?: string;
    description?: string;
    favicons?: {
        path: string;
        size: [number, number];
    }[];
    icons?: {
        path: string;
        size: [number, number];
    }[];
    language?: string;
    name?: string;
    router: RouterProps;
    shortName?: string;
    themeColor?: string;
    tileColor?: string;
}


export class TamlandAppConfig{

    backgroundColor: string;

    description: string;

    favicons: {
        path: string;
        size: [number, number];
    }[];

    icons: {
        path: string;
        size: [number, number];
    }[];

    language: string;

    name: string;

    router: RouterProps;

    shortName: string;

    themeColor: string;

    tileColor: string;

    constructor(config: TamlandAppConfigInterface){

        this.backgroundColor = config.backgroundColor ?? "#fff";

        this.description = config.description ?? "Tamland application description";

        this.favicons = config.favicons ?? [{
            path: "/favicon.png",
            // Width height array
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            size: [32, 32]
        }];

        this.icons = config.icons ?? [{
            path: "/favicon.png",
            // Width height array
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            size: [128, 128]
        }];

        this.language = config.language ?? "en";

        this.name = config.name ?? "Tamland application";

        this.router = config.router;

        this.shortName = config.shortName ?? "Tamland app";

        this.themeColor = config.themeColor ?? "#fff";

        this.tileColor = config.tileColor ?? "#fff";

    }

}
