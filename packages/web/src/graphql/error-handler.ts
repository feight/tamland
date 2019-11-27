

import { ErrorResponse } from "apollo-link-error";

import logger from "../logger";


export const logGraphQLError = function(errors: ErrorResponse["graphQLErrors"] = []): void{

    errors.forEach(({
        message,
        locations = [],
        path = []
    }) => {

        const tag = "[GraphQL error]:";

        logger.error([
            `${ tag } message: ${ message }`,
            `${ tag } path: ${ path.join(`\n${ tag } `) }`,
            `${ tag } location: ${ locations.map((location) => `${ location.line }:${ location.column }`).join(`\n${ tag } `) }`
        ].join(""));

    });

};

export const logNetworkError = function(error: ErrorResponse["networkError"]): void{

    if(error){

        logger.error(`[Network error]: ${ String(error) }`);

    }

};

export const errorHandler = function(errors: ErrorResponse): void {

    logGraphQLError(errors.graphQLErrors);

    logNetworkError(errors.networkError);

};
