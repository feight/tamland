

import {
    Express,
    NextFunction,
    Request,
    Response
} from "express";

import { DomainConfiguration } from "./types";


export const domain = function(
    app: Express,
    config: DomainConfiguration
): void{

    const {
        hostname,
        local = false
    } = config;

    /*
     * Redirect to the hostname if request.hostname !== hostname. This prevents
     * application-id.appspot.com domain from servering the application if the
     * application has a hostname configured.
     */
    app.use((
        request: Request,
        response: Response,
        next: NextFunction
    ): void => {

        // Don't do this locally because we use http during development.
        if(
            !local &&
            hostname &&
            request.hostname !== "127.0.0.1" &&
            request.hostname !== "localhost" &&
            (
                request.protocol !== "https" ||
                request.hostname !== hostname
            )
        ){

            response.redirect(`https://${ hostname }${ request.url }`);

            return;

        }

        next();

    });

};
