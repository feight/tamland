

import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import fetch from "node-fetch";
import { Request } from "express";


export const client = (request: Request): ApolloClient<{}> => {

    const cache = new InMemoryCache();

    const link = ApolloLink.from([
        onError(({
            graphQLErrors,
            networkError
        }) => {

            if(graphQLErrors){

                graphQLErrors.forEach(({
                    message,
                    locations,
                    path
                }) => console.log(
                    `[GraphQL error]: Message: ${ message }, Location: ${ locations }, Path: ${ path }`
                ));

            }

            if(networkError){

                console.log(`[Network error]: ${ networkError }`);

            }

        }),
        new HttpLink({
            credentials: "same-origin",
            fetch,
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