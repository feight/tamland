

export interface TamlandAppConfigInterface{
    backgroundColor?: string;
    description?: string;
    icons?: {
        path: string;
        size: [number, number];
    }[];
    language?: string;
    name?: string;
    shortName?: string;
    themeColor?: string;
    tileColor?: string;
}


export class TamlandAppConfig{

    public backgroundColor: string;

    public description: string;

    public language: string;

    public icons: {
        path: string;
        size: [number, number];
    }[];

    public name: string;

    public shortName: string;

    public themeColor: string;

    public tileColor: string;

    public constructor(config: TamlandAppConfigInterface){

        this.backgroundColor = config.backgroundColor || "#fff";
        this.description = config.description || "Tamland application description";
        this.icons = config.icons || [{
            path: "/favicon.png",
            // Width height array
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers, no-magic-numbers
            size: [128, 128]
        }];
        this.language = config.language || "en";
        this.name = config.name || "Tamland application";
        this.shortName = config.shortName || "Tamland app";
        this.themeColor = config.themeColor || "#fff";
        this.tileColor = config.tileColor || "#fff";

    }

}
