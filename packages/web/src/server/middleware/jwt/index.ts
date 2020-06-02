

import express from "express";
import expressJWT from "express-jwt";

import { JWTConfiguration } from "./types";

import logger from "../../../logger";


export const jwt = function(
    app: express.Express,
    config: JWTConfiguration
): void{

    const {
        cookieName = "jwt-cookie",
        secret = false
    } = config;

    if(secret){

        app.use(expressJWT({
            credentialsRequired: false,
            getToken: (request: express.Request): string|null => {

                /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */

                const query = request.query;
                const cookies = request.cookies;
                const headers = request.headers;

                if(
                    cookies?.[cookieName]
                ){

                    return cookies[cookieName];

                }else if(
                    headers.authorization &&
                    headers.authorization.split(" ")[0] === "Bearer"
                ){

                    return headers.authorization.split(" ")[1];

                }else if(
                    query?.token
                ){

                    return query.token;

                }

                /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */

                return null;

            },
            secret
        }));

    }else{

        logger.warn("JWT middleware has not been configured. Missing jwt.secret in tamland configuration.");

    }


};
