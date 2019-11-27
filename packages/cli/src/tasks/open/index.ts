

import { open } from "../../utils/open";
import prompts from "../../prompts";


export const openTask = async function(): Promise<void>{

    const environment = await prompts.environments.web();
    const url = `https://${ environment.hostname ?? `${ environment.project }.appspot.com` }`;

    await open(url);

};
