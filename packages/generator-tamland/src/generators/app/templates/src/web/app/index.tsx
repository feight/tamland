

import * as React from "react";
import { Router } from "@tamland/web";

import { routes } from "../routes";


export class App extends React.PureComponent{

    public render(): React.ReactNode{

        return (
            <div>
                <Router routes={ routes } />
            </div>
        );

    }

}

