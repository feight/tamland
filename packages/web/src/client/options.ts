

import { Application } from "../components/application";
import {
    TamlandAppConfig,
    TamlandAppConfigInterface
} from "../app/config";


export interface TamlandClientOptionsInterface{

    /**
     * Required.
     *
     * The React app component that will be rendered as the App
     *
     */
    App: typeof Application;

    /**
     * Required.
     *
     * The React app configuration
     *
     */
    config: TamlandAppConfigInterface;

}

export class TamlandClientOptions{

    App: typeof Application;

    config: TamlandAppConfig;

    constructor(options: TamlandClientOptionsInterface){

        this.App = options.App;
        this.config = new TamlandAppConfig(options.config);

    }

}
