

import * as React from "react";
import { StaticRouter } from "react-router-dom";

import { BaseRouter } from "./base";


export class Router extends BaseRouter{

    render(): React.ReactNode{

        return (
            <StaticRouter
                context={ this.props.context }
                location={ this.props.location }
            >
                { this.props.children }
            </StaticRouter>
        );

    }

}
