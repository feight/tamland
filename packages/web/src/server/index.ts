

import "reflect-metadata";
import "core-js/stable";
import "regenerator-runtime/runtime";

import express from "express";

import {
    TamlandServerOptions,
    TamlandServerOptionsInterface
} from "./options";
import { TamlandServerMiddleware } from "./middleware";
import { TamlandServerRouters } from "./routers";

import logger from "../logger";


export class Server{

    public readonly port: number;

    public readonly options: TamlandServerOptions;

    private readonly app: express.Express;

    public constructor(serverOptions: TamlandServerOptionsInterface){

        const defaultPort = 8080;

        this.port = process.env.PORT ? Number(process.env.PORT) : defaultPort;
        this.options = new TamlandServerOptions(serverOptions);

        this.app = express();

    }

    public start(): void{

        const middleware = new TamlandServerMiddleware(this.app, this.options);
        const routers = new TamlandServerRouters(this.app, this.options);

        // Needed for this async iife
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        (async (): Promise<void> => {

            middleware.security();
            middleware.domain();
            middleware.caching();
            middleware.compression();

            routers.static();

            // Add the request logger here so it skips static file requests.
            middleware.logger();

            routers.browserconfig();

            await routers.graphql();

            routers.manifest();

            // All routes from here on will be forced to end in a slash
            middleware.slash();
            middleware.clientHints();

            routers.application();

            middleware.cookie();
            middleware.jwt();
            middleware.uncaught();

            this.app.listen(this.port, (): void => {

                logger.info(`App listening on port ${ this.port }`);
                logger.info("");
                logger.info("Press Ctrl+ C to quit.");
                logger.info("");

            });

        })();

    }

}
