

import { Express } from "express";
import slashMiddleware from "express-slash";


export const slash = function(
    app: Express
): void{

    app.use(slashMiddleware());

};
