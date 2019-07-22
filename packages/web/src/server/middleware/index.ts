

import { Express } from "express";

import { caching } from "./caching";
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

    private app: Express;

    private options: TamlandServerOptions;

    public constructor(app: Express, options: TamlandServerOptions){

        this.app = app;
        this.options = options;

    }

    public caching(): void{

        caching(this.app, { local });

    }

    public compression(): void{

        compression(this.app);

    }

    public cookie(): void{

        cookie(this.app);

    }

    public domain(): void{

        domain(this.app, {
            hostname: this.options.hostname,
            local
        });

    }

    public jwt(): void{

        jwtMiddleware(this.app, this.options.jwt);

    }

    public logger(): void{

        logger(this.app);

    }

    public security(): void{


        security(this.app, { xPoweredBy: this.options.xPoweredBy });

    }

    public slash(): void{

        slash(this.app);

    }

    public uncaught(): void{

        uncaught({ local });

    }

}
