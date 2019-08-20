

import express from "express";

import { ClientHintsConfiguration } from "./types";


export const clientHints = function(
    app: express.Express,
    config: ClientHintsConfiguration
): void{

    // Set custom response headers
    app.use((
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void => {

        // Set the X-Powered-By header
        if(config.hints && config.hints.length > 0){
            response.setHeader("Accept-CH", config.hints.join(","));
        }

        next();

    });

};
