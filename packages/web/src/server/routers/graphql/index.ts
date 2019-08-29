

import {
    ApolloServer,
    ApolloServerExpressConfig
} from "apollo-server-express";
import { DocumentNode } from "graphql";
import { gql } from "apollo-server";


export const createApolloServer = function(config?: ApolloServerExpressConfig): ApolloServer{

    let typeDefs: DocumentNode[] | string[] = [
        gql`
            type Query {
                "A simple type for getting started!"
                hello: String
            }
        `
    ];

    const resolvers = {
        Query: {
            hello: (): string => "world"
        }
    };

    if(config && config.typeDefs){

        typeDefs = typeDefs.concat(Array.isArray(config.typeDefs) ? config.typeDefs as DocumentNode[] : [config.typeDefs as DocumentNode]);

    }

    return new ApolloServer({
        playground: {
            settings: {
                "editor.theme": "light"
            }
        },
        resolvers: {
            ...config && config.resolvers ? config.resolvers : {},
            ...resolvers
        },
        typeDefs,
        ...config
    });

};
