

import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import { BaseRouter } from "./base";


export default class ClientRouter extends BaseRouter{

    render(): React.ReactNode{

        return (
            <BrowserRouter>
                { this.props.children }
            </BrowserRouter>
        );

    }

}
