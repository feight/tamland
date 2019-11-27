

import { Express } from "express";

import { applicationRouter } from "./application";
import { browserconfigRouter } from "./browserconfig";
import { createApolloServer } from "./graphql";
import { manifestRouter } from "./manifest";
import { staticRouter } from "./static";

import { TamlandServerOptions } from "../options";


const local = process.env.local === "true" || false;


export class TamlandServerRouters{

    private readonly app: Express;

    private readonly options: TamlandServerOptions;

    constructor(app: Express, options: TamlandServerOptions){

        this.app = app;
        this.options = options;

    }

    application(): void{

        const {
            App,
            config
        } = this.options;

        this.app.use(applicationRouter({
            App,
            config,
            local
        }));

    }

    browserconfig(): void{

        const { config } = this.options;
        const {
            icons,
            tileColor
        } = config;

        this.app.use(browserconfigRouter({
            icons,
            tileColor
        }));

    }

    async graphql(): Promise<void>{

        if(this.options.graphql){

            const resolvers = this.options.graphql.resolvers;
            const server = await createApolloServer(resolvers);

            server.applyMiddleware({
                app: this.app,
                path: "/graphql/"
            });

        }

    }

    manifest(): void{

        const { manifest } = this.options;

        this.app.use(manifestRouter(manifest));

    }

    static(): void{

        const cwd = process.cwd();

        const {
            cacheExpiration,
            staticFiles,
            staticFolder
        } = this.options;

        this.app.use(staticRouter({
            app: this.app,
            cacheExpiration,
            cwd,
            local,
            staticFiles,
            staticFolder
        }));

    }

}
