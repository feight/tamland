

import { ApolloServer } from "apollo-server-express";
import {
    buildSchema,
    BuildSchemaOptions
} from "type-graphql";


export const createApolloServer = async function(
    resolvers: BuildSchemaOptions["resolvers"]
): Promise<ApolloServer>{

    const schema = await buildSchema({ resolvers });

    return new ApolloServer({
        playground: {
            settings: {
                "editor.theme": "light"
            }
        },
        schema
    });

};
