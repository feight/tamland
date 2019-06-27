

import * as React from "react";
import {
    Link,
    Router
} from "@tamland/core";

import style from "./index.module.scss";

import "./index.scss";

import { routes } from "../routes";


export class App extends React.PureComponent{

    public render(): JSX.Element{

        return (
            <div className={ style.app }>
                <Router routes={ routes } />
                <ul>
                    <li>
                        <Link to="/">
                            { "Home" }
                        </Link>
                    </li>
                    <li>
                        <Link to="/x/">
                            { "X" }
                        </Link>
                    </li>
                    <li>
                        <Link to="/page-not-found/">
                            { "Page not found" }
                        </Link>
                    </li>
                </ul>
            </div>
        );

    }

}

