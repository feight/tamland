

import * as React from "react";
import { Router } from "@tamland/core";

import style from "./index.scss";

import { routes } from "../routes";


export class App extends React.PureComponent{

    public render(): JSX.Element{

        return (
            <div className={ style.app }>
                <Router routes={ routes } />
            </div>
        );

    }

}

