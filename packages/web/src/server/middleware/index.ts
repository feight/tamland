

import { Express } from "express";

import { caching } from "./caching";
import { clientHints } from "./client-hints";
import { compression } from "./compression";
import { cookie } from "./cookie";
import { domain } from "./domain";
import { jwt as jwtMiddleware } from "./jwt";
import { logger } from "./logger";
import { security } from "./security";
import { slash } from "./slash";
import { uncaught } from "./uncaught";

import { TamlandServerOptions } from "../options";


const local = process.env.local === "true" || false;


export class TamlandServerMiddleware{

    private readonly app: Express;

    private readonly options: TamlandServerOptions;

    constructor(app: Express, options: TamlandServerOptions){

        this.app = app;
        this.options = options;

    }

    caching(): void{

        caching(this.app, { local });

    }

    clientHints(): void{

        clientHints(this.app, {
            hints: this.options.clientHints
        });

    }

    compression(): void{

        compression(this.app);

    }

    cookie(): void{

        cookie(this.app);

    }

    domain(): void{

        domain(this.app, {
            hostname: this.options.hostname,
            local
        });

    }

    jwt(): void{

        jwtMiddleware(this.app, this.options.jwt);

    }

    logger(): void{

        logger(this.app);

    }

    security(): void{


        security(this.app, { xPoweredBy: this.options.xPoweredBy });

    }

    slash(): void{

        slash(this.app);

    }

    uncaught(): void{

        uncaught();

    }

}
