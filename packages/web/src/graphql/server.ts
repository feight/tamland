

import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import fetch from "node-fetch";
import { Request } from "express";

import { errorHandler } from "./error-handler";


export const client = (request?: Request): ApolloClient<{}> => {

    if(!request){

        throw new Error("Server Apollo Client requires the current request");

    }

    const cache = new InMemoryCache();

    const link = ApolloLink.from([
        onError(errorHandler),
        new HttpLink({
            credentials: "same-origin",
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            fetch: <WindowOrWorkerGlobalScope["fetch"]> <unknown> fetch,
            headers: {
                cookie: request.header("Cookie")
            },
            uri: "http://localhost:5555/graphql/"
        })
    ]);

    return new ApolloClient({
        cache,
        link,
        ssrMode: true
    });

};
