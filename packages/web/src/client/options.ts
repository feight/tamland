

import { ComponentClass } from "react";

import {
    TamlandAppConfig,
    TamlandAppConfigInterface
} from "../app/config";


export interface TamlandClientOptionsInterface {

    /**
     * Required.
     *
     * The React app component that will be rendered as the App
     *
     */
    App: ComponentClass;

    /**
     * Required.
     *
     * The React app configuration
     *
     */
    config: TamlandAppConfigInterface;

}

export class TamlandClientOptions{

    public App: ComponentClass;

    public config: TamlandAppConfig;

    public constructor(options: TamlandClientOptionsInterface){

        this.App = options.App;
        this.config = new TamlandAppConfig(options.config);

    }

}
