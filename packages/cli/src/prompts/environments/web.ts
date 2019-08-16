

import { config } from "../../config";
import { prompt } from "../../utils/prompt";


const web = function(): Promise<{
    name: string;
    project: string;
}>{

    const environments = config.platform.web.environments || [];

    if(environments.length === 0){

        throw new Error("Tamland project has no environments configured");

    }

    return prompt("Web Environment", environments.map((environment): {
        name: string;
        value: {
            name: string;
            project: string;
        };
    } => ({
        name: `${ environment.name } (${ environment.hostname || `${ environment.project }.appspot.com` })`,
        value: environment
    })));

};


export default web;
