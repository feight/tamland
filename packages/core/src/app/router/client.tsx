

import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import { BaseRouter } from "./base";


export class Router extends BaseRouter{

    public render(): JSX.Element{

        return (
            <BrowserRouter>
                { this.props.children }
            </BrowserRouter>
        );

    }

}
