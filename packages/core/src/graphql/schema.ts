

import {
    GraphQLObjectType,
    GraphQLSchema
} from "graphql";
import { stripIndent } from "common-tags";

import defaultQueries from "./queries";
import defaultMutations from "./mutations";
import {
    TamlandGraphQLFieldConfig,
    TamlandGraphQLFieldConfigMap
} from "./types";


interface GraphqlSchemaConfig {
    authorized?: boolean;
    // These can legitimately be of any type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutations?: TamlandGraphQLFieldConfigMap<any, any, any>;
    // These can legitimately be of any type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queries?: TamlandGraphQLFieldConfigMap<any, any, any>;
}


export const schema = function(config: GraphqlSchemaConfig): GraphQLSchema{

    const {
        authorized = false,
        mutations,
        queries
    } = config;

    // These can legitimately be of any type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const accumulator: { [index: string]: TamlandGraphQLFieldConfig<any, any, any> } = {};

    const filter = (
        // These can legitimately be of any type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        object: TamlandGraphQLFieldConfigMap<any, any, any>
    // These can legitimately be of any type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): TamlandGraphQLFieldConfigMap<any, any, any> => Object.keys(object).reduce((acc, value): TamlandGraphQLFieldConfigMap<any, any, any> => {

        if(authorized || object[value].public){

            // eslint-disable-next-line no-param-reassign
            delete object[value].public;

            acc[value] = object[value];

        }

        return acc;

    }, accumulator);

    const mutationFields = mutations ? filter(mutations) : {};
    const queryFields = queries ? filter(queries) : {};

    return new GraphQLSchema({
        mutation: new GraphQLObjectType({
            description: stripIndent`
                Graphql mutations modify data in the data store and return a value.
                They can be used to insert, update, or delete data.
            `,
            fields: {
                ...mutations ? {} : defaultMutations,
                ...mutationFields
            },
            name: "Mutation"
        }),
        query: new GraphQLObjectType({
            description: stripIndent`
                A GraphQL query is used to read or fetch values from the data store.
            `,
            fields: {
                ...queries ? {} : defaultQueries,
                ...queryFields
            },
            name: "Query"
        })
    });

};
