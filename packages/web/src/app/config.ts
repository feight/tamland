

export interface TamlandAppConfigInterface{
    backgroundColor?: string;
    description?: string;
    icons?: {
        [id: number]: string;
    };
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

    public name: string;

    public shortName: string;

    public themeColor: string;

    public tileColor: string;

    public constructor(config: TamlandAppConfigInterface){

        this.backgroundColor = config.backgroundColor || "#fff";
        this.description = config.description || "Tamland application description";
        this.language = config.language || "en";
        this.name = config.name || "Tamland application";
        this.shortName = config.shortName || "Tamland app";
        this.themeColor = config.themeColor || "#fff";
        this.tileColor = config.tileColor || "#fff";

    }

}
