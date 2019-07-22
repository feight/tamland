

/*
    eslint
    @typescript-eslint/no-explicit-any: "off",
*/

import https from "https";

import { Router } from "express";
import graphqlHTTP from "express-graphql";

import {
    GraphqlRouterConfiguration,
    GraphqlServerConfiguration,
    JSONResponse,
    PostJSONOptions,
    Request,
    Response
} from "./types";

import { schema as generateSchema } from "../../../graphql/schema";


const postJSON = (
    options: PostJSONOptions,
    data: any
): Promise<JSONResponse> => new Promise((resolve, reject): void => {

    const request = https.request(options, (response): void => {

        const output: string[] = [];

        response.setEncoding("utf8");

        response.on("data", (chunk: string): void => {
            output.push(chunk);
        });

        response.on("end", (): void => {

            resolve({
                data: JSON.parse(output.join("")),
                status: response.statusCode
            });

        });

    });

    request.on("error", reject);
    request.write(JSON.stringify(data));
    request.end();

});

const graphqlServer = (config: GraphqlServerConfiguration): graphqlHTTP.Middleware => graphqlHTTP((
    request: Request,
    response: Response
): graphqlHTTP.OptionsResult => {

    const {
        authorized = (authRequest: Request): boolean => !authRequest,
        graphiql = false,
        mutations,
        queries
    } = config;

    response.setHeader("Content-Security-Policy", "");

    return {
        context: {
            request,
            response
        },
        graphiql,
        schema: generateSchema({
            authorized: authorized(request),
            mutations,
            queries
        })
    };

});


export const graphqlRouter = (config: GraphqlRouterConfiguration = {}): Router => {

    const {
        authorized = (request: Request): boolean => !request,
        endpoint = "/graphql/",
        host
    } = config;

    const router = Router({
        caseSensitive: true,
        strict: true
    });

    router.get(endpoint, graphqlServer({
        authorized,
        graphiql: true
    }));

    if(host){

        router.post(endpoint, async (request, response): Promise<void> => {

            response.setHeader("Content-Security-Policy", "");

            const headers = request.headers;

            delete headers.origin;
            delete headers.host;
            delete headers["content-length"];

            const defaultStatus = 500;

            const {
                data,
                status = defaultStatus
            } = await postJSON({
                headers,
                hostname: host,
                method: "POST",
                path: endpoint,
                port: 443
            }, request.body);

            response.status(status).send(JSON.stringify(data)).end();

        });

    }else{

        router.post(endpoint, graphqlServer({
            authorized
        }));

    }

    return router;

};
