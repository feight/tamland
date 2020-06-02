

import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import fetch from "node-fetch";

import { id } from "./serialization";
import { errorHandler } from "./error-handler";

import logger from "../logger";


// This is expected to be of type any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getInitialState = function(): any{

    let initialState = {};

    const element = document.querySelector(`#${ id }`);

    if(element){

        try{

            // No real way to make this safe
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
    onError(errorHandler),
    new HttpLink({
        credentials: "same-origin",
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        fetch: <WindowOrWorkerGlobalScope["fetch"]> <unknown> fetch,
        uri: "http://localhost:5555/graphql/"
    })
]);


export const client = (): ApolloClient<{}> => new ApolloClient({
    cache,
    link
});
