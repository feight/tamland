

import { ApolloClient } from "apollo-client";
import { Request } from "express";

import { id } from "./serialization";
import type { client as ClientClient } from "./client";
import type { client as ServerClient } from "./server";


const server = typeof window === "undefined";


// Needed so that webpack won't require this on the server
// eslint-disable-next-line max-len
// eslint-disable-next-line no-eval, @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
const client: typeof ClientClient | typeof ServerClient = server ? eval("require")("./server").client : require("./client").client;


export const apolloStateSerializationId = id;

export const createApolloClient = (request?: Request): ApolloClient<{}> => client(request);
