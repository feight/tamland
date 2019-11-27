

import * as React from "react";

import { BaseRouter } from "./base";


// Needed so that webpack won't require this on the client
// eslint-disable-next-line no-eval, @typescript-eslint/no-require-imports
const universalModule = typeof window === "undefined" ? eval("require")("./server") : require("./client");

const UniversalRouter = universalModule.Router;


export class Router extends BaseRouter{

    render(): React.ReactNode{

        return (
            <UniversalRouter
                context={ this.props.context }
                history={ this.props.history }
                location={ this.props.location }
            >
                { this.props.children }
            </UniversalRouter>
        );

    }

}
