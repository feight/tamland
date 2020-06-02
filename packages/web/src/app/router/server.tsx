

import * as React from "react";
import { StaticRouter } from "react-router-dom";

import { BaseRouter } from "./base";


export default class ServerRouter extends BaseRouter{

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
