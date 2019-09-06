

import * as React from "react";

import { RouterProps } from "./router";


export interface ApplicationProps{
    router: RouterProps;
}


export class Application extends React.PureComponent<ApplicationProps>{

    public render(): React.ReactNode{

        return (
            <div>
                { "blank app" }
            </div>
        );

    }

}

