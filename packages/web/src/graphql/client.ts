

import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import fetch from "node-fetch";

import { id } from "./serialization";

import logger from "../logger";


// This is expected to be of type any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getInitialState = function(): any{

    let initialState = {};

    const element = document.querySelector(`#${ id }`);

    if(element){

        try{

            initialState = JSON.parse(element.innerHTML);

        }catch(error){

            logger.error(`Could not parse initial data from element #${ id }`);

        }

    }else{

        logger.error(`Could not find initial data element #${ id }`);

    }

    return initialState;

};


const cache = new InMemoryCache();

cache.restore(getInitialState());


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
        uri: "http://localhost:5555/graphql/"
    })
]);


export const client = (): ApolloClient<{}> => new ApolloClient({
    cache,
    link
});
