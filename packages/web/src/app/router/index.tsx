

import * as React from "react";

import { BaseRouter } from "./base";
import type ClientRouter from "./client";
import type ServerRouter from "./server";


// Needed so that webpack won't require this on the client
// eslint-disable-next-line no-eval, @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
const UniversalRouter: typeof ClientRouter | typeof ServerRouter = typeof window === "undefined" ? eval("require")("./server") : require("./client");


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
