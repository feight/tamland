

import cookieParser from "cookie-parser";
import { Express } from "express";


export const cookie = function(
    app: Express
): void{

    /*
     * Add the cookie parsing middleware
     *
     * Parse Cookie header and populate req.cookies with an object keyed by the
     * cookie names.
     */
    app.use(cookieParser());

};
