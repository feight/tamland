

/*
    eslint
    @typescript-eslint/no-explicit-any: "off",
*/

import https from "https";
import {
    IncomingMessage,
    ServerResponse
} from "http";

import express from "express";
import graphqlHTTP from "express-graphql";

import { schema as generateSchema } from "../../graphql/schema";
import { TamlandGraphQLFieldConfigMap } from "../../graphql/types";


export interface GraphqlRouterConfiguration {
    authorized?: (request: IncomingMessage) => boolean;
    endpoint?: string;
    host?: string | undefined;
    mutations?: TamlandGraphQLFieldConfigMap<any, any, any>;
    queries?: TamlandGraphQLFieldConfigMap<any, any, any>;
}

interface GraphqlServerConfiguration {
    authorized?: (request: IncomingMessage) => boolean;
    graphiql?: boolean;
    mutations?: TamlandGraphQLFieldConfigMap<any, any, any>;
    queries?: TamlandGraphQLFieldConfigMap<any, any, any>;
}

interface JSONResponse {
    data: any;
    status: number | undefined;
}

const postJSON = (
    options: string | https.RequestOptions | URL,
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
    request: IncomingMessage,
    response: ServerResponse
): graphqlHTTP.OptionsResult => {

    const {
        authorized = (authRequest: IncomingMessage): boolean => !authRequest,
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


export const graphqlRouter = (config: GraphqlRouterConfiguration = {}): express.Router => {

    const {
        authorized = (request: IncomingMessage): boolean => !request,
        endpoint = "/graphql/",
        host
    } = config;

    const router = express.Router({
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
