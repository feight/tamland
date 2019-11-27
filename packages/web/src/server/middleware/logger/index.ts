

import express from "express";

import log from "../../../logger";


export const logger = function(app: express.Express): void{

    app.use((
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void => {

        const url = `${ request.protocol }://${ request.get("host") ?? "localhost" }${ request.originalUrl }`;

        response.on("finish", (): void => {

            log.info(`${ request.method.toUpperCase() } ${ response.statusCode } ${ url }`, {
                httpRequest: {
                    remoteIp: request.connection.remoteAddress,
                    requestMethod: request.method,
                    requestUrl: request.url,
                    status: response.statusCode
                }
            });

        });

        next();

    });

};
