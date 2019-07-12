

import * as React from "react";
import { Router } from "@tamland/web";

import { routes } from "../routes";


export class App extends React.PureComponent{

    public render(): JSX.Element{

        return (
            <div>
                <Router routes={ routes } />
            </div>
        );

    }

}

