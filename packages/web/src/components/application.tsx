

import * as React from "react";

import { PageProps } from "./page";
import { TamlandRoute } from "./router";


export interface ApplicationProps{
    loader: (id: string) => () => Promise<{ default: React.ComponentType<PageProps> }>;
    routes: TamlandRoute[];
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

