

/*
    eslint
    @typescript-eslint/no-explicit-any: "off",
*/

import https from "https";
import {
    IncomingMessage,
    ServerResponse
} from "http";

import { TamlandGraphQLFieldConfigMap } from "../../../graphql/types";


export interface GraphqlRouterConfiguration {
    authorized?: (request: IncomingMessage) => boolean;
    endpoint?: string;
    host?: string | undefined;
    mutations?: TamlandGraphQLFieldConfigMap<any, any, any>;
    queries?: TamlandGraphQLFieldConfigMap<any, any, any>;
}

export interface GraphqlServerConfiguration {
    authorized?: (request: IncomingMessage) => boolean;
    graphiql?: boolean;
    mutations?: TamlandGraphQLFieldConfigMap<any, any, any>;
    queries?: TamlandGraphQLFieldConfigMap<any, any, any>;
}

export interface JSONResponse {
    data: any;
    status: number | undefined;
}

export class Request extends IncomingMessage{}
export class Response extends ServerResponse{}

export type PostJSONOptions = string | https.RequestOptions | URL;
