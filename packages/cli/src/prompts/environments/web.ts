

import { config } from "../../config";
import { prompt } from "../../utils/prompt";


const web = function(): Promise<{
    hostname?: string;
    name: string;
    project: string;
}>{

    const environments = config.platform.web.environments;

    if(environments.length === 0){

        throw new Error("Tamland project has no environments configured");

    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return prompt("Web Environment", environments.map((environment): {
        name: string;
        value: {
            hostname?: string;
            name: string;
            project: string;
        };
    } => ({
        name: `${ environment.name } (${ environment.hostname ?? `${ environment.project }.appspot.com` })`,
        value: environment
    })));

};


export default web;
